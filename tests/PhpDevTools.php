<?php
namespace PhpDevTools\tests\units;

use PDO;

class PhpDevTools extends \atoum {

    private $oDb = null;

    private function getSqlite () {
        if ( $this->oDb === null ) {
            $this->oDb = new \PDO('sqlite:' . __DIR__ . '/data/blog.sqlite');
        }
        return $this->oDb;
    }

    public function testCallLogWithInit() {
        $this
            ->given( $c = $this->testedClass->getClass() )
            ->if (
                $this->function->header->doesNothing(),
                $c::init()
            )
            ->then
            ->boolean( $c::log('xxx') )
            ->isTrue();
    }

    public function testCallLogWithoutInit() {
        $this
            ->given( $c = $this->testedClass->getClass() )
            ->then
            ->boolean( $c::log('xxx') )
            ->isFalse( null );
    }


    public function testIsSqlLiteOk() {
        $this
            ->given( $res = $this->getSqlite()->query('select count(*) as nb from Post')->fetch() )
            ->then
            ->integer( (int)$res['nb'] )
            ->isEqualTo(30);
    }

}