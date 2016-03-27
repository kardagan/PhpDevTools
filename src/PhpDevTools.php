<?php
namespace PhpDevTools;

class PhpDevTools {

    /* id de la page qui est envoyé dans le header */
    protected static $id = null;

    /* conf */
    protected static $conf = array (
        'redis' => array (
            'host' => '127.0.0.1',
            'port' => 6379,
            'database' => 0,
            'ttl' => 3600
        )
    );

    protected static $redis_connection = null;

    /* ref dump */
    private static $ref = null;

    public static function __callStatic($name, $arguments) {
        if ( self::$id === null ) {
            return false;
        }
        if ( !in_array($name,['log','dump','database']) ) {
            throw new \Exception("Call to undefined function");
        }
        $backtrace = debug_backtrace(DEBUG_BACKTRACE_PROVIDE_OBJECT,1);

        $options = array();

        $expressions = self::$ref->getInputExpressions($options);

        $data = [
            'type' => $name,
            'data' => self::$ref->query($arguments[0] , $expressions[0] ? $expressions[0] : null ),
            'var' => [

            ],
            'origin' => [
                'file' => $backtrace[0]['file'],
                'line' => $backtrace[0]['line']
            ]
        ];

        self::record( $data );
        return true;
    }

    public static function init() {
        self::getId();
        self::$ref = new \PhpDevTools\ref\ref();
    }

    public static function getJson( $psId ) {
        header('Access-Control-Allow-Headers:X-Requested-With');
        header('Access-Control-Allow-Origin:*');
        header('Content-Type:application/json');
        $aDebug = self::getRedisConnection()->lrange(self::getKey($psId),0,-1);
        foreach ( $aDebug as &$sDebug ) {
            $sDebug = json_decode($sDebug);
        }
        echo json_encode($aDebug);
        die();
    }

    private static function getId() {
        if ( self::$id === null ) {
            self::$id = uniqid();
            header('phpdevtools:'.self::$id);
        }
        return self::$id;
    }

    private static function getKey ( $psId ) {
        return 'phpdevtools:' . $psId;
    }

    private static function record( $data ) {
        $key = self::getKey(self::getId());
        self::getRedisConnection()->rpush($key,json_encode($data));
        self::getRedisConnection()->expire($key,self::$conf['redis']['ttl']);
    }

    private static function getRedisConnection () {
        if ( self::$redis_connection === null ) {
            self::$redis_connection = new \Predis\Client([
                'host'=>self::$conf['redis']['host'],
                'port'=>self::$conf['redis']['port'],
            ]);
            self::$redis_connection->select(self::$conf['redis']['database']);
        }
        return self::$redis_connection;
    }

}
