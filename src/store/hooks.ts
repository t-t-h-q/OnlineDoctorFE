import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from 'store'

/**
 * Custom hook that provides a typed useDispatch function for the application.
 * Ensures that all dispatched actions are correctly typed with AppDispatch.
 *
 * @returns The useDispatch function typed with AppDispatch for consistent dispatching of actions.
 */

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
