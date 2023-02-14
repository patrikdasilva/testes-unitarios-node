import { setYear, parseISO} from "date-fns";

/**
 * 
 * Receives "2022-08-10" amd returns "2023-08-10"
 */
export function getFeatureDate(date: string): Date {
    return setYear(parseISO(date), new Date().getFullYear() + 1)
}