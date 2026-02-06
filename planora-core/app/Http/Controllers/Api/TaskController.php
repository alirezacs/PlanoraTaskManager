<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\TaskRequest;
use App\Models\Task;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $request->validate([
            'date' => ['nullable', 'date']
        ]);
        $date = $request->has('date') ? Carbon::createFromDate($request->get('date')) : Carbon::now();

        $tasks = auth()->user()->tasks()->whereDate('date', $date)->orderByRaw("FIELD(priority, 'low', 'medium', 'high')")->with('assignments')->get()->toArray();

        return apiResponse(data: $tasks);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TaskRequest $request)
    {
        $data = $request->only([
            'title',
            'description',
            'date',
            'start_date',
            'end_date',
            'status',
            'priority',
            'assigns',
        ]);

        $data['created_by'] = auth()->user()->id;

        /* Create Task */
        $task = Task::query()->create($data);
        /* Create Task */

        /* Assign Users To Task */
        $task->assignments()->attach($data['assigns']);
        /* Assign Users To Task */

        return apiResponse(data: $task->toArray(), message: 'Task created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        $task->load('assignments');
        return apiResponse($task->toArray());
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(TaskRequest $request, Task $task)
    {
        $data = $request->only([
            'title',
            'description',
            'date',
            'start_date',
            'end_date',
            'status',
            'priority',
            'assigns'
        ]);

        /* Update Task */
        $task->update($data);
        /* Update Task */

        /* Sync Assigns */
        $task->assignments()->sync($data['assigns']);
        /* Sync Assigns */

        return apiResponse(message: 'Task updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function updateStatus(Request $request, Task $task)
    {
        $request->validate([
            'status' => ['required', 'in:pending,in_progress,completed']
        ]);

        $task->update([
            'status' => $request->input('status')
        ]);

        return apiResponse(message: 'Task status updated successfully');
    }
}
