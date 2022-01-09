export default function usePerson(sex) {
  let isMale = false,
    isFemale = false;

  switch (sex) {
    case "male":
      isMale = true;
      break;
    case "female":
      isFemale = true;
      break;
    default:
      break;
  }

  return {
    isMale,
    isFemale,
  };
}
