<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->alias([
            'jwt.auth' => \App\Http\Middleware\JwtAuth::class,
            'jwt.guest' => \App\Http\Middleware\JwtGuest::class,
            'admin' => \App\Http\Middleware\isAdmin::class,
            'employee' => \App\Http\Middleware\isEmployee::class,
            'client' => \App\Http\Middleware\isClient::class,
        ]);

        $middleware->priority([
            \App\Http\Middleware\JwtAuth::class,
            \App\Http\Middleware\JwtGuest::class,
            \App\Http\Middleware\isAdmin::class,
            \App\Http\Middleware\isEmployee::class,
            \App\Http\Middleware\isClient::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
