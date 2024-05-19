import { useState } from 'react';
import orderCover from '../../../assets/shop/banner2.jpg'
import Cover from '../../Shared/Cover/Cover';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';


const Order = () => {
    const [tabIndex, setTabIndex] = useState(0);

    return (
        <div>
            <Cover img={orderCover} title="Order Food"></Cover>

            <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList>
                <Tab>Title 1</Tab>
                <Tab>Title 2</Tab>
                </TabList>

                <TabPanel>
                <h2>Any content 1</h2>
                </TabPanel>
                <TabPanel>
                <h2>Any content 2</h2>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default Order;