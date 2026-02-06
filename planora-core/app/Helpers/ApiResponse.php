<?php
function apiResponse(array $data = [], string $message = '', int $status = 200, bool $success = true)
{
    $response = [];

    !empty($data) && $response['data'] = $data;
    !empty($message) && $response['message'] = $message;

    return response($response, $status);
}


