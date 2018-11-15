 /*jshint esversion:6*/
 /*jasmine: true*/
/* feedreader.js
 
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */

 /*The following links have been helpful in solving the project 
 *https://stackoverflow.com/questions/16626735/how-to-loop-through-an-array-containing-objects-and-access-their-properties
 *https://matthewcranford.com/feed-reader-walkthrough-part-4-async-tests/
 */
$(function() {
//    this test suite contains all the RSS feeds definitions
    describe('RSS Feeds', ()=> {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not empty
         */
         
        it('are not empty', ()=> {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
     
        /*This a test that loops through each feed in the allFeeds object 
         and ensures it has a URL defined*/
         it('url is defined',()=> {
            allFeeds.forEach(feed => {
                expect(feed.url).toBeDefined(); // makes sure that the URL is defined
                expect(feed.url.length).not.toBe(0); // makes sure that the URL is not empty
            });
         });
     
        /* A test that loops through each feed
          in the allFeeds object */
         it('name is defined',()=> {
            allFeeds.forEach(feed => {
                expect(feed.name).toBeDefined(); //ensures it has a name defined
                expect(feed.name.length).not.toBe(0);// ensures that the name is not empty
            });
         });
    });
 
 
    //A test suite that contains tests for the app's menu functionality
    describe('The menu', ()=> {

        /*A test that ensures the menu element is
          hidden by default*/
         it('element is hidden by default', ()=> {
            const theBody = document.querySelector('body');
            expect(theBody.classList.contains('menu-hidden')).toBe(true);
         });

         /* A test that ensures the menu changes
           visibility when the menu icon is clicked*/
          it('changes visibility when clicked', ()=>{
            const theBody = document.querySelector('body');
            const menuIcon = document.querySelector('.menu-icon-link');
            expect(theBody.classList.contains('menu-hidden')).toBe(true);
           
            // An expectation that makes sure that the menu displays when clicked
            menuIcon.click();
            expect(theBody.classList.contains('menu-hidden')).toBe(false); 
            
           //An expectation that makes sure that the menu hides when clicked again
            menuIcon.click();
            expect(theBody.classList.contains('menu-hidden')).toBe(true);           
          });
    });
 
 
    //A test suite that contains tests for the initial load of feeds for the app
    describe('Initial Entries',()=>{

        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * The loadFeed() function is asynchronous so that's the reason for
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         // Loads the feed and wait untill it completes its work
         beforeEach(done=>{
            loadFeed(0,done);
         });
         
         //Checks that loadedFeed() has loaded the correct elements to the DOM
         it('completes work',()=> {
             const feed = document.querySelectorAll('.feed .entry');
             //expect(feed.children.length > 0).toBe(true);
             expect(feed.length).toBeGreaterThan(0);
         });
    });
 
 
    //A test suite for checking the content of a feed selection
    describe('New Feed Selection', ()=> {
        const feed = document.querySelector('.feed');
        const firstFeed = [];
        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * loadFeed() is asynchronous.
         */
        beforeEach(done=> {
            /*Load the first feed,pass in its stored values
            * Load the second feed and pass in done as its callback
            */
            //loadFeed(0,storedValues,loadFeed(1,done));}
            loadFeed(0,function(){
                const feedOne = storedValues;
                loadFeed(1,function(){
                const feedTwo = storedValues;
                done();
                });
            });
            
        });
             
             //Stores the values of the first feed into an array
            function storedValues(){
                Array.from(feed.children).forEach(entry=> {
                firstFeed.push(entry.innerText); 
                });
            }
     
        /* a test that ensures when a new feed is loaded by the loadFeed() 
        function that the content in the feed actually changes*/
        it('content changes', ()=> {
            Array.from(feed.children).forEach((entry,index)=>{
            expect(entry.innerText === firstFeed[index]).toBe(false);
            });
            
        });
    });
        
}());
