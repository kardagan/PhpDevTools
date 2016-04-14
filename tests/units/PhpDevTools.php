<?php

namespace PhpDevTools\tests\units;

class PhpDevTools extends \atoum {

    public function testCallLogWithInit() {
        /*
        $this->function->header->doesNothing();
        $this->dump($this->function->header);
        $this->function->header->wasCalledWithArguments('coucou')->once;
*/
        echo "aa";
        var_dump( $this->function->header->doesNothing() );

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

}