// Capitalize the first letter of a string
export const validateCollectionName = (input:any) => {
  // Add typeguard for input type
    if(typeof input === 'string'){
      return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
    }
    return input;
  }   

// Validate the form data