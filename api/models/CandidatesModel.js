import request from '../request';

/** ****************************************
 * @async
 * @description Loads Candidates
 * @returns {Array} Candidate
 */
export const loadCandidates = async () => {
  try {
    const result = await request({
      url: `/candidates`,
      method: 'GET',
    });

    if (result) {
      return result;
    }
    throw result;
  } catch (error) {
    throw error;
  }
};
