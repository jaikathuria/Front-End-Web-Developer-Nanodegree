/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */


$(function() {
    /* This is  first test suite 
    */
    describe('RSS Feeds', function() {
        /* This tests is to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        
        it('is URL defined', function(){
            for(i in allFeeds){
                 expect(allFeeds[i].url).toBeDefined();
                 expect(allFeeds[i].url).not.toBeNull();
                 expect(allFeeds[i].url).not.toBe("");
            }
             
         });
        

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('is name defined', function(){
            for(i in allFeeds){
                 expect(allFeeds[i].name).toBeDefined();
                 expect(allFeeds[i].name).not.toBeNull();
                 expect(allFeeds[i].name).not.toBe("");
            }
             
         });
    });


    /* Test suite named "The menu" */
    describe('The Menu', function(){
        /* Test that ensures the menu element is
         * hidden by default.
         */
        it('is hidden by defaut', function(){
            expect($('body').hasClass("menu-hidden")).toBe(true);     
        });

         /* Test that ensures the menu changes
          * visibility when the menu icon is clicked. 
          * This test have two expectations: 1) does the menu display when
          * clicked and 2) does it hide when clicked again.
          */
        it('visibility change when menu icon is clicked',function(){
            $(".menu-icon-link").click(); // to check the click triggered expectation
            expect($('body').hasClass("menu-hidden")).not.toBe(true);
            $(".menu-icon-link").click(); // to check the click triggered expectation
            expect($('body').hasClass("menu-hidden")).toBe(true);
        });
    });
    /* Test suite named "Initial Entries" */
    describe('Initial Entries',function(){
        
        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        
        beforeEach(function(done){
            loadFeed(0,function(){
                done();
            });
        });
        
        it('feed container has minimum of 1 entry',function(done){
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
        });
    });
    /* Test suite named "New Feed Selection" */
    
    describe('New Feed Selection',function(){
        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        var oldFeed,newFeed;
        beforeEach(function(done){
            loadFeed(0,function(){
                oldFeed = $('.feed').html();
                loadFeed(1,function(){
                newFeed = $('.feed').html();
                    done();
                });
            
            });
            
        });
        
        it('is different from old feed',function(){
            expect(newFeed).not.toEqual(oldFeed);
        });
        
        
    });
}());