    SELECT
        p.packetid,
        p.packetname,
        p.packetimage,
        p.packetprice,
        m.merchantname,
        pc.categoryid,
        x.categorycount,
        AVG(reviewrating)::numeric(10,1) as reviewaverage
    FROM packet p JOIN merchant m ON p.merchantid = m.merchantid
        LEFT JOIN review r ON p.packetid = r.packetid
        LEFT JOIN packetcategory pc ON p.packetid = pc.packetid
        LEFT JOIN (
            SELECT
                packetid,
                COUNT(categoryid) AS categorycount
            FROM packetcategory
            GROUP BY packetid
        ) AS x ON pc.packetid = x.packetid
    WHERE p.packetprice BETWEEN 1000 AND 100000
    GROUP BY
        p.packetid,
        p.packetname,
        p.packetimage,
        p.packetprice,
        m.merchantname,
        pc.categoryid,
        x.categorycount
    ORDER BY reviewaverage ASC;


    SELECT
        p.packetid,
        p.packetname,
        p.packetimage,
        p.packetprice,
        m.merchantname,
        pc.categoryid,
        x.categorycount,
        AVG(reviewrating)::numeric(10,1) as reviewaverage
    FROM packet p JOIN merchant m ON p.merchantid = m.merchantid
        LEFT JOIN review r ON p.packetid = r.packetid
        LEFT JOIN packetcategory pc ON p.packetid = pc.packetid
        LEFT JOIN (
            SELECT
                packetid,
                COUNT(categoryid) AS categorycount
            FROM packetcategory
            GROUP BY packetid
        ) AS x ON pc.packetid = x.packetid
    WHERE pc.categoryid IN (1, 2) p.packetprice > 10 AND p.packetprice < 100000
    GROUP BY
        p.packetid,
        p.packetname,
        p.packetimage,
        p.packetprice,
        m.merchantname,
        pc.categoryid,
        x.categorycount
    ORDER BY reviewaverage ASC
    LIMIT 8;