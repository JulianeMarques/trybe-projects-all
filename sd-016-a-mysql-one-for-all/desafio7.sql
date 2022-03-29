SELECT
  a.artist_name AS 'artista',
  alb.album_name AS 'album',
  COUNT(f.artist_id) AS 'seguidores'

FROM SpotifyClone.artist AS a 
INNER JOIN SpotifyClone.album alb 
ON alb.artist_id = a.artist_id
INNER JOIN SpotifyClone.following AS f 
ON a.artist_id = f.artist_id

GROUP BY a.artist_name, alb.album_name
ORDER BY seguidores DESC, a.artist_name, alb.album_name;