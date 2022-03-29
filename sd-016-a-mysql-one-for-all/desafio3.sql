SELECT 
  u.user_name AS 'usuario',
  COUNT(h.user_id) AS 'qtde_musicas_ouvidas',
  ROUND(SUM(s.song_length / 60), 2) AS 'total_minutos'

FROM SpotifyClone.history AS h
INNER JOIN SpotifyClone.user AS u ON u.user_id = h.user_id
INNER JOIN SpotifyClone.song AS s ON h.song_id = s.song_id

GROUP BY usuario 
ORDER BY usuario ASC;