import request from '../request';

/** ****************************************
 * @async
 * @description Loads Technologies
 * @returns {Array} Technology
 */
export const loadTechcologies = async () => {
  try {
    const result = await request({
      url: `/technologies`,
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
