<?php

return [

    'defaults' => [
        'guard' => 'web',
        'passwords' => 'admins', 
    ],

    'guards' => [
        'web' => [
            'driver' => 'session',
            'provider' => 'admins', 
        ],
        'api' => [
            'driver' => 'sanctum',
            'provider' => 'admins',
        ],
    ],

    'providers' => [
        'admins' => [
            'driver' => 'eloquent',
            'model' => App\Models\Admin::class,
        ],
    ],

    'passwords' => [
        'users' => [
            'provider' => 'users',
            'table' => 'password_reset_tokens',
            'expire' => 60,
            'throttle' => 60,
        ],
    ],

    'password_timeout' => 10800,

];
