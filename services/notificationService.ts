import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { Task } from './taskService';

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export class NotificationService {
  static async requestPermissions(): Promise<boolean> {
    // On web, notifications work differently
    if (Platform.OS === 'web') {
      if ('Notification' in window) {
        const permission = await Notification.requestPermission();
        return permission === 'granted';
      }
      return false;
    }

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      
      if (finalStatus !== 'granted') {
        console.log('Failed to get push token for push notification!');
        return false;
      }
      
      return true;
    } else {
      console.log('Must use physical device for Push Notifications');
      return false;
    }
  }

  static async scheduleTaskNotification(task: Task): Promise<string | null> {
    if (!task.due_date || !task.due_time) return null;

    const notificationDate = new Date(`${task.due_date}T${task.due_time}`);
    const now = new Date();

    // Don't schedule notifications for past dates
    if (notificationDate <= now) return null;

    // On web, use browser notifications
    if (Platform.OS === 'web') {
      if ('Notification' in window && Notification.permission === 'granted') {
        const timeout = notificationDate.getTime() - now.getTime();
        if (timeout > 0) {
          setTimeout(() => {
            new Notification('Task Reminder', {
              body: task.title,
              icon: '/favicon.ico',
            });
          }, timeout);
          return `web-${task.id}`;
        }
      }
      return null;
    }

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Task Reminder',
        body: task.title,
        data: { taskId: task.id },
        sound: 'default',
      },
      trigger: {
        date: notificationDate,
      },
    });

    return notificationId;
  }

  static async cancelNotification(notificationId: string): Promise<void> {
    if (Platform.OS === 'web') {
      // For web, we can't easily cancel setTimeout notifications
      // This is a limitation of browser notifications
      console.log('Cannot cancel web notifications once scheduled');
      return;
    }
    await Notifications.cancelScheduledNotificationAsync(notificationId);
  }

  static async cancelAllNotifications(): Promise<void> {
    if (Platform.OS === 'web') {
      console.log('Cannot cancel all web notifications');
      return;
    }
    await Notifications.cancelAllScheduledNotificationsAsync();
  }

  static async getScheduledNotifications() {
    if (Platform.OS === 'web') {
      console.log('Cannot get scheduled web notifications');
      return [];
    }
    return await Notifications.getAllScheduledNotificationsAsync();
  }
}
