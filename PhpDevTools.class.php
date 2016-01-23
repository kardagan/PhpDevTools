<?php

class PhpDevTools {

    /* id de la page qui est envoyé dans le header*/
    private static $id = null;

    public function __callStatic($name, $arguments) {

    }

    public static function init() {
        self::getId();
    }

    private static function getId() {
        if ( self::$id === null ) {
            self::$id = uniqid();
            header("phpdevtools:".self::$id);
        }
    }
}
