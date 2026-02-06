<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ResetPasswordNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(
        private string $token
    )
    {
        //
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $frontUrl = config('app.frontend_url');

        $resetUrl = "{$frontUrl}/reset-password?token={$this->token}&email="  . urlencode($notifiable->getEmailForPasswordReset());

        return (new MailMessage)
            ->subject('Reset Your Password')
            ->greeting('Hello!' . $notifiable->full_name)
            ->line('We received a request to reset your password. If you made this request, you can reset your password using the button below.')
            ->action('Reset My Password', $resetUrl)
            ->line('This password reset link will expire in 60 minutes.')
            ->line('If you didn’t request a password reset, you can safely ignore this email. Your current password will remain unchanged.')
            ->salutation('Regards,')
            ->salutation(config('app.name') . ' Team');
    }
}
