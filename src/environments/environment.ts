export const environment = {
  production: false,
  backend: {
    protocol: 'http',
    host: '127.0.0.1',
    port: '3000',
    endpoints: {
      toutesLesMusiques: '/musics',
      randomMusique: '/musics/random',
      uneMusique: '/musics/:id',
      createMusique: '/musics',
      rechercheTitre:'/musics/title/:title',
      modifMusique:'/musics/:id',
      deleteMusique:'/musics/:id'
    }
  }
};
