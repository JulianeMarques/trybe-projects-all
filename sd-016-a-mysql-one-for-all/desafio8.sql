SELECT
  a.artist_name AS 'artista',
  alb.album_name AS 'album'

FROM SpotifyClone.artist AS a
INNER JOIN SpotifyClone.album AS alb
ON alb.artist_id = a.artist_id
WHERE a.artist_name = 'Walter Phoenix'

GROUP BY a.artist_name, alb.album_name;