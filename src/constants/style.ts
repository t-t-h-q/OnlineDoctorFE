/**
 * Defines a mapping of appointment statuses to their corresponding
 * background and text color styles for UI representation.
 *
 * Each status is associated with a specific background color (`bg`)
 * and text color (`text`) to visually differentiate appointment states.
 */
export const STATUS_STYLES: Record<string, { bg: string; text: string }> = {
  Confirmed: {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
  },
  Completed: {
    bg: 'bg-green-100',
    text: 'text-green-800',
  },
  Cancelled: {
    bg: 'bg-red-100',
    text: 'text-red-800',
  },
  Pending: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
  },
  Rescheduled: {
    bg: 'bg-purple-100',
    text: 'text-purple-800',
  },
} as const
