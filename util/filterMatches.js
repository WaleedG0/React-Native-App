const filterMatches = (candidatesDB, filters, rejected, accepted) => {
  const matches = candidatesDB.filter(candidate => {
    //using for loop so we can break if candidate does not have any of the technology in his toolbox.
    for (let i = 0; i < filters.length; i++) {
      if (
        candidate.technologies.findIndex(
          technology =>
            technology.name === filters[i].name &&
            technology.experianceYears >= filters[i].experianceYears
        ) === -1
      ) {
        return false;
      }
    }

    return rejected.indexOf(candidate._id) === -1 &&
      accepted.indexOf(candidate._id) === -1
      ? true
      : false;
  });

  return matches;
};

export default filterMatches;
