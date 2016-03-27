<?php

class PhpDevToolsMock extends \PhpDevTools\PhpDevTools {

    public static function reset () {
        self::$id = null;
        self::$redis_connection = null;
        self::$conf = array (
            'redis' => array (
                'host' => '127.0.0.1',
                'port' => 6379,
                'database' => 0,
                'ttl' => 3600
            )
        );
    }

    public static function getConf() {
        return self::$conf;
    }
}

class PhpDevToolsTest extends PHPUnit_Framework_TestCase
{
    private $conf = null;

    public function __construct() {
        $this->conf=PhpDevToolsMock::getConf();
    }

    protected function setUp() {
        PhpDevToolsMock::reset();
    }

    public function testGetConf ( ) {
        $this->assertEquals($this->conf,PhpDevToolsMock::getConf(),'La conf du reset mock ne correspond pas à la conf par défaut', $delta = 0.0, $maxDepth = 10, $canonicalize = true);
    }

    public function testBadGetConf ( ) {
        $this->assertNotEquals(['redis'=>'127.0.0.10'],PhpDevToolsMock::getConf(),'La conf du reset mock ne correspond pas à la conf par défaut', $delta = 0.0, $maxDepth = 10, $canonicalize = true);
    }

    public function testCallLogWithInit() {
        PhpDevToolsMock::init();
        $this->assertEquals( true , PhpDevToolsMock::log('xxxxx') );
    }

    public function testCallLogWithoutInit() {
        $this->assertEquals( false , PhpDevToolsMock::log('xxxxx') );
    }

    public function testCallUndefinedFunction() {
        $this->expectException("\\Exception");
        $this->expectExceptionMessage('Call to undefined function');
        PhpDevToolsMock::init();
        PhpDevToolsMock::foo('xxxxx');
    }
}