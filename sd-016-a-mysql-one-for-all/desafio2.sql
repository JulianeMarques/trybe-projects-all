SELECT  
  (select count(*) from SpotifyClone.song) as 'cancoes',
  (select count(*) from SpotifyClone.artist) as 'artistas',
  (select count(*) from SpotifyClone.album) as 'albuns';