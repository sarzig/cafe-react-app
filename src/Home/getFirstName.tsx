// getFirstName.tsx

export const getFirstName = (name: string): string => {
    const trimmedName = name.trim(); // Trim any leading or trailing whitespace
    const spaceIndex = trimmedName.indexOf(' ');
    
    if (spaceIndex !== -1) {
        return trimmedName.substring(0, spaceIndex); // Extract and return the first name
    } else {
        return trimmedName; // Return the full name if no space is found
    }
};
