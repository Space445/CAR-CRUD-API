export default function carApp() {
    return {
      mostPopularModel: '',
      fetchMostPopularModel() {
        axios.get('/mostPopularCL')
          .then(response => {
            this.mostPopularModel = response.data.model;
          })
          .catch(error => {
            console.error(error);
          });
      }
    };
  }
  