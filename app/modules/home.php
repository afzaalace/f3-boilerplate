<?php

class Home extends Controller {

	//! HTTP route pre-processor
	function beforeroute($f3) {
			
	}

	function view($f3) {
        $f3->set('content',"home");
        echo Template::instance()->render('layout.htm');
	}
    
	function login($f3) {
        $f3->set('content',"login");
        echo Template::instance()->render('layout.htm');
	}
	function logout($f3) {
        // Do something to logout
        $f3->reroute('/login.html');
	}
}