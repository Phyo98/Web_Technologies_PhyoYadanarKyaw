<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'Food & Dining',
            'Transportation',
            'Shopping',
            'Entertainment',
            'Housing',
            'Utilities',
            'Health',
            'Income',
            'Education',
            'Travel',
            'Insurance',
            'Gifts & Donations',
            'Taxes',
            'Debt Payments',
            'Miscellaneous',
        ];

        foreach ($categories as $category) {
            DB::table('categories')->updateOrInsert(
                ['name' => $category]
            );
        }
    }
}
