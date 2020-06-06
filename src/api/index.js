import axios from "axios";

const PUBLIC_URI = "https://saytheirnames.dev/api";

class API {
  constructor() {
    this.axios = axios.create({
      baseURL: `${PUBLIC_URI}`,
    });

    this.axios.interceptors.request.use(
      (config) => {
        /** In dev, intercepts request and logs it into console for dev */
        console.info("✉️ ", config);

        return config;
      },
      (error) => {
        if (DEBUG) {
          console.error("✉️ ", error);
        }
        return Promise.reject(error);
      }
    );
  }

  setErrors = (errors) => {
    const errorObj = {};
    if (errors && Object.keys(errors).length) {
      Object.keys(errors).forEach((error) => {
        errorObj[error] = errors[error].msg;
      });
    }

    return errorObj;
  };

  getPeople = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.axios.get("/people");
        return resolve(response.data);
      } catch (error) {
        return reject(error);
      }
    });
  };

  getPeopleNext = (next) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.axios.get(`/people?page=${next}`);
        return resolve(response.data);
      } catch (error) {
        return reject(error);
      }
    });
  };

  getPeopleById = (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.axios.get(`/people/${id}`);
        return resolve(response.data);
      } catch (error) {
        return reject(error);
      }
    });
  };

  getDonations = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.axios.get("/donations");
        return resolve(response.data);
      } catch (error) {
        return reject(error);
      }
    });
  };

  getDonationsNext = (next) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.axios.get(`/donations?page=${next}`);
        return resolve(response.data);
      } catch (error) {
        return reject(error);
      }
    });
  };



  getDonationsById = (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.axios.get(`/donations/${id}`);
        return resolve(response.data);
      } catch (error) {
        return reject(error);
      }
    });
  };

  getPetitions = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.axios.get("/petitions");
        return resolve(response.data);
      } catch (error) {
        return reject(error);
      }
    });
  };


  getPetitionsNext = (next) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.axios.get(`/petitions?page=${next}`);
        return resolve(response.data);
      } catch (error) {
        return reject(error);
      }
    });
  };



  getPetitionsById = (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.axios.get(`/petitions/${id}`);
        return resolve(response.data);
      } catch (error) {
        return reject(error);
      }
    });
  };
}

export default new API();
