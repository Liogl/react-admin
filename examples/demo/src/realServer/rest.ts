import FakeRest from 'fakerest';
import fetchMock from 'fetch-mock';
import generateData from 'data-generator-retail';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNotify, useRedirect, fetchStart, fetchEnd } from 'react-admin';

// import xxx from './';
// Get https://ubiquity.api.blockdaemon.com/v2/ethereum/mainnet/account/0xf4AE92d4E484c7916Cd351C6031AbBb05a0E3a6c/txs?limit=25&assets=ethereum%2Fnative%2Feth

export default () => {
    // const dispatch = useDispatch();
    // const redirect = useRedirect();
    // const notify = useNotify();
    // const [loading, setLoading] = useState(false);
    // const callURL = `https://ubiquity.api.blockdaemon.com/v2/ethereum/mainnet/account/0xf4AE92d4E484c7916Cd351C6031AbBb05a0E3a6c/txs?limit=25&assets=ethereum%2Fnative%2Feth`;

    // const APIres = fetch(`${callURL}`, { method: 'GET' });
    // console.log('APIres', APIres);
    //    fetch(`/comments/${record.id}`, { method: 'GET', body: updatedRecord })
    // fetch(`${callURL}`, { method: 'GET' })
    //     .then(() => {
    //         console.log("done fetch");
    //         //        notify('Comment approved');
    //         //        redirect('/comments');
    //     })
    //     .catch((e) => {
    //         notify('Error: comment not approved', { type: 'warning' });
    //     })
    //     .finally(() => {
    //         //        setLoading(false);
    //         dispatch(fetchEnd()); // stop the global loading indicator
    //         console.log('Test');
    //     });

    const data = generateData({ serializeDate: true });
    const restServer = new FakeRest.FetchServer('http://localhost:4000');
    if (window) {
        window.restServer = restServer; // give way to update data in the console
    }
    restServer.init(data);
    restServer.toggleLogging(); // logging is off by default, enable it
    fetchMock.mock('begin:http://localhost:4000', restServer.getHandler());
    return () => fetchMock.restore();
};
