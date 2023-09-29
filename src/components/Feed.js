import React from 'react';
import { useState, useEffect, useRef } from "react";
import { CardMedia } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import './Feed.css'


const imageList = ['asset1.jpg'];
const allVideoList = [
    'ehime-matsuyama-exp-hotspring.mp4',
    'tokyo--exp-cristmas.mp4',
    'tokyo-shibuya-exp-perfume.mp4',
    'tokyo-shibuya-food-marshumallow.mp4',

    'ehime-matsuyama-exp-hotspring.mp4',
    'tokyo--exp-cristmas.mp4',
    'tokyo-shibuya-exp-perfume.mp4',
    'tokyo-shibuya-food-marshumallow.mp4',
];

const endMessage = (
    < p style={{ textAlign: 'center' }}>
        <b>Yay! You have seen it all</b>
    </p >
);
const loadingMessage = (< h4 > Loading...</h4 >);

const Feed = () => {
    const defaultList = [
        'ehime-matsuyama-exp-hotspring.mp4',
        'tokyo--exp-cristmas.mp4',
    ];
    const [items, setItems] = useState(defaultList);
    function checkHasMore() {
        return items.length < allVideoList.length;
    }
    const batch = 2;
    function fetchItems() {
        const n = items.length;
        const newItems = allVideoList.slice(n, n + batch);
        setItems([...items, ...newItems]);
    }
    function onScroll(e) {
    }


    const touchStart = useRef(null);
    const touchEnd = useRef(null);

    const onTouchStart = (e) => {
        touchEnd.current = null; // otherwise the swipe is fired even with usual touch events
        touchStart.current = e.targetTouches[0].clientY;
    }

    const onTouchMove = (e) => {
        touchEnd.current = e.targetTouches[0].clientY;
        e.preventDefault();  // prevent scrolling by user
    }

    const feedItemIndex = useRef(0);
    const feedElement = useRef();
    const minSwipeDistance = 50;

    const onTouchEnd = (e) => {
        if (!touchStart.current || !touchEnd.current) { return; }
        const distance = touchStart.current - touchEnd.current;
        if (Math.abs(distance) >= minSwipeDistance) {
            const flag = distance > 0 ? 1 : -1;  // 1 if go to next item, -1 if go to previous item
            const nextIndex = feedItemIndex.current + flag;
            if ((flag == -1 && feedItemIndex.current == 0) || (flag == 1 && document.getElementById(`feed-item-${nextIndex}`) == undefined)) {
                // If the current item is first one or last one, do nothing.
                return;
            }
            document.getElementById(`feed-item-${nextIndex}`).scrollIntoView();
            document.getElementById(`feed-item-${feedItemIndex.current}`).pause();
            document.getElementById(`feed-item-${nextIndex}`).play();
            // feedElement.current.scrollBy(0, isLeftSwipe ? 300 : -300);
            feedItemIndex.current = nextIndex;
        }
    }

    useEffect(() => {
        feedElement.current.addEventListener('touchmove', (e) => {
            onTouchMove(e);
        }, { passive: false });  // `passive` should be false for using `e.preventDefault()` in this event.
    }, []);

    return (
        <div id="feed"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            style={{
                overflowY: "scroll",
                scrollBehavior: "smooth",
                scrollSnapType: "y mandatory",
            }}
            ref={feedElement}
        >
            < InfiniteScroll
                dataLength={items.length} //This is important field to render the next data
                next={fetchItems}
                hasMore={checkHasMore()}
                loader={loadingMessage}
                endMessage={endMessage}
                scrollableTarget="feed"
                onScroll={onScroll}
                style={{
                }}
            // below props only if you need pull down functionality
            // refreshFunction={this.refresh}
            // pullDownToRefresh
            // pullDownToRefreshThreshold={50}
            // pullDownToRefreshContent={
            //     <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
            // }
            // releaseToRefreshContent={
            //     <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
            // }
            >
                {
                    items.map(function (url, ind) {
                        return (
                            < CardMedia
                                component='video'
                                image={`/public/video/${url}`}
                                autoPlay
                                controls
                                muted
                                id={`feed-item-${ind}`}
                                key={ind}
                                style={{
                                    scrollSnapAlign: "end",
                                    height: "80vh"
                                }}
                            />
                        )
                    })
                }
            </InfiniteScroll >
        </div >
    );
};

export default Feed;