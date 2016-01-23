<?php

class PhpDevTools {

    /* id de la page qui est envoyé dans le header */
    private static $id = null;

    /* redis */
    private static $redis_connection = null;
    private static $redis_host = '127.0.0.1';
    private static $redis_port = 6379;
    private static $redis_database = 1;

    public function __callStatic($name, $arguments) {
        if ( !in_array($name,['log','dump','database']) ) {
            return false;
        }

        $backtrace = debug_backtrace(DEBUG_BACKTRACE_PROVIDE_OBJECT,1);
        $data = [
            'type' => $name,
            'data' => $arguments,
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
    }

    private static function getId() {
        if ( self::$id === null ) {
            self::$id = uniqid();
            header('phpdevtools:'.self::$id);
        }
        return self::$id;
    }

    private static function record( $data ) {
        if ( self::$redis_connection === null ) {
            self::$redis_connection = new \Predis\Client([
                'host'=>self::$redis_host,
                'port'=>self::$redis_port,
            ]);
            self::$redis_connection->select(self::$redis_database);
        }
        self::$redis_connection->lpush('phpdevtools:'.self::getId(),json_encode($data));
    }
}
