<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function update(Request $request)
    {
        $request->validate([
            'full_name' => ['required', 'string', 'max:255'],
        ]);

        /* Update User */
        auth()->user()->update([
            'full_name' => $request->full_name
        ]);
        /* Update User */

        return apiResponse(message: 'User Updated Successfully');
    }
}
