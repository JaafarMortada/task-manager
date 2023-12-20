<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{

    public function run(): void
    {
        DB::table('roles')->insert([
            [
                'role' => 'employer',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'role' => 'employee',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
