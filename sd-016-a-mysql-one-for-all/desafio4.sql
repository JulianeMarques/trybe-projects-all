SELECT 
  `user_name` AS 'usuario',
   IF(
        YEAR(MAX(h.reproduction_history)) = 2021,
        'Usuário ativo',
        'Usuário inativo'
    ) AS 'condicao_usuario'

FROM SpotifyClone.user AS u
JOIN SpotifyClone.history as h
ON h.user_id = u.user_id

GROUP BY u.user_name
ORDER BY u.user_name ASC;