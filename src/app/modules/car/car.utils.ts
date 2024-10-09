export const totalTime = async (startTime: string, endTime: string) => {
    const startHours = parseInt(startTime.split(':')[0]);
    const startMinutes = parseInt(startTime.split(':')[1]);
    const endHours = parseInt(endTime.split(':')[0]);
    const endMinutes = parseInt(endTime.split(':')[1]);

    const durationHours = endHours - startHours;
    const durationMinutes = endMinutes - startMinutes;
    const hoursToMinutes = durationHours * 60;
    const totalMinutes = hoursToMinutes + durationMinutes;
    const totalTime = totalMinutes / 60;

    return totalTime;
}