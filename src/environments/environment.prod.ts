export const environment = {
  production: true,
  backend: {
    protocol: 'http',
    host: '127.0.0.1',
    port: '3000',
    endpoints: {
      toutesLesMusiques: '/musics',
      randomMusique: '/musics/random',
      uneMusique: '/music/:id',
      createMusique: '/musics',
      rechercheTitre:'/musics/title/:title',
      modifMusique:'/musics/:id',
      deleteMusique:'/musics/:id'
    }
  }
};
