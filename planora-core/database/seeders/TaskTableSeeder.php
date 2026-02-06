<?php

namespace Database\Seeders;

use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TaskTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Task::create([
            'title' => 'First Task',
            'description' => 'First Task Description',
            'date' => now(),
            'start_date' => now()->addDay(),
            'end_date' => now()->addDays(10),
            'status' => 'pending',
            'priority' => 'low',
            'created_by' => User::first()->id
        ]);
    }
}
