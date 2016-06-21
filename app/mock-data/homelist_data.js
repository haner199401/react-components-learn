/**
 * Created by haner on 16/6/21.
 *
 */

import Mock, { Random } from 'mockjs';


//list data
module.exports = {
    ListData: Mock.mock({
        "data|20": [{
            title: /\w{10}/,
            coverImg: Random.image('750x280')
        }]
    }),
    ItemData:Mock.mock({
        "data|1-20": [{
            title: /\w{10}/,
            coverImg: Random.image('750x280')
        }]
    })
};
