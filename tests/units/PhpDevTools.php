<?php

namespace PhpDevTools\tests\units;

class PhpDevTools extends \atoum {

    public function testCallLogWithInit() {
        $this
            ->given( $c = $this->testedClass->getClass() )
            ->if ( $c::init() )
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

}