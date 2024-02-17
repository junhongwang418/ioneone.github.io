---
title: "book: Software Engineering at Google"
date: "2022-11-10"
---

This is my note/review of [Software Engineering at Google](https://www.oreilly.com/library/view/software-engineering-at/9781492082781/).

Here are some Google's software engineering best practices I decided to follow.

### Optimize for the reader

> …, we recognize that they are shorter than `if` statement and therefore more convenient for code authors. However, because they tend to be more diffucult for readers to understand than the more verbose `if` statements, we restrict their usage ([https://orei.ly/ftyvG](https://google.github.io/styleguide/pyguide.html#211-conditional-expressions)).
>
> _source: [Software Engineering at Google chapter 8](https://abseil.io/resources/swe-book/html/ch08.html)_

In Java, a simple if then return statement can be written in one line.

```java
if (condition) return something;
```

However, at Dynasty, we find the code more readable when they are in seperate lines.

```java
if (condition) {
  return something;
}
```

### Referene Documentation

> Some documentation styles (and some documentation generators) require various forms of boilerplate on function comments, like “Returns:”, “Throws:”, and so forth, but at Google we haven’t found them to be necessary. It is often clearer to present such information in a single prose comment that’s not broken up into artificial section boundaries:
>
> _source: [Software Engineering at Google chapter 10](https://abseil.io/resources/swe-book/html/ch10.html)_

We follow the same documentation guideline at Dynasty. Function comments usually doesn't include special tags like [`@param`](https://docs.oracle.com/javase/7/docs/technotes/tools/windows/javadoc.html#param) or [`@return`](https://docs.oracle.com/javase/7/docs/technotes/tools/windows/javadoc.html#return). It's simply a markdown comment.

```java
// Do something to the given foo and returns the
// processed foo.
//
// If foo is `null`, it throws `NullPointerException`.
public String doSomething(String foo) {
  ...
}
```

### File Comments

> Allmost all code files at Google must contain a file comment. (Some header files that contain only one utility function, etc., might deciate from this standard.) File comments should begin with a header of the following form:
>
> ```hpp
> // -------------------
> // str_cat.h
> // -------------------
> //
> // This header file contains functions for efficiently concatenating and
> // appending strings: StrCat() and StrAppend(). Most of the work within
> // these routines is actually handled through the use of a special
> // AlphaNum type, which was designed to be used as a parameter type that
> // efficiently manages conversion to strings and avoids copies in the
> // above operations.
> // ...
> ```
>
> Generally, a file comment should begin with an outline of what's contained in hte code you are reading. It should identify the code's main use cases and intended audience (in the preceding case, developers who want to cancatenate strings). Any API that cannot be succinctly described in the first paragraph or two is usually the sign of an API that is not well thought out. Consider breaking the API into separate components in those cases.
>
> _source: [Software Engineering at Google chapter 10](https://abseil.io/resources/swe-book/html/ch10.html)_

It was never clear to me what should be included in file comments until I read this section of the book. I used to think that the class name should be suffice to show what the file is about. But it looks like we should also include the overview of the public functions (i.e. APIs) included in the file.

### Class Comments

> Most modern programming languages are object oriented. Class comments are therefore more importrant for defining the API "objects" in use in a codebase. All public ckasses (and structs) at Google must contain a class comment describing the class/struct, importatnt methods of that class, and the purpose of the class. Generally, class comments should be "nouned" wutg documentation emphasizing their object aspect. That is, say, "The Foo class contains x, y, z, allows you to do Bar, and has the following Baz aspects," and so on.
>
> Class comments should generally begin with a comment of the following form:
>
> ```cpp
> // -------------------------------------------------------------------
> // AlphaNum
> // -------------------------------------------------------------------
> //
> // The AlphaNum class acts as the main parameter type for StrCat() and
> // StrAppend(), providing efficient conversion of numeric, boolean,
> // and hexadecimal values (through the Hex type) into string.
> ```
>
> _source: [Software Engineering at Google chapter 10](https://abseil.io/resources/swe-book/html/ch10.html)_

In the case the file only contains a class, rather than list of static methods, then I think file comments are unnecessary and class comments should do.

### Function Comments

> All free functions, or public methods of a class, at Google must also contain a function comment describing what the function does. Function comments should stress the active nature of their use, beginnig with an indicative verb describing what the function does and what is returned.
>
> Function comments should generally being with a comment of the following form:
>
> ```cpp
> // StrCat()
> //
> // Merged the given strings or numbers, using no delimiter(s), returning
> // the merged result as a string.
> ```
>
> _source: [Software Engineering at Google chapter 10](https://abseil.io/resources/swe-book/html/ch10.html)_

Notice there are some redundency in function comments and class comments. In production code, it's important not to repeat yourself ([DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)). However, repetition in documentation is good because it helps readers understand how different components of the system connect together.

> Most engineers loathe redundancy, and with good reason. But in documentation, redundancy is often useful. An important point buried within a wall of text can be difficult to remember or tease out. On the other hand, placing that point at a more prominent location early can lose context provided later on. Usually, the solution is to introduce and summarize the point within an introductory paragraph, and then use the rest of the section to make your case in a more detailed fashion. In this case, redundancy helps the reader understand the importance of what is being stated.
>
> _source: [Software Engineering at Google chapter 10](https://abseil.io/resources/swe-book/html/ch10.html)_

The quote above is about documentation, but I think it's also applicable to class comments and function comments. Class comments are like the introduction and conclusion. Function comments are like the body of the documentation.

Programming languages like C/C++ have header vs source file distinction. According to Google's C++ style guide,

> ... comments describing the use of the class should go together with its interface definition; commments about the class operation and implementation should accompany the implementation of the class's methods.
>
> _source: [Google C++ Style Guide](https://google.github.io/styleguide/cppguide.html#Class_Comments)_

### Conceptual Documentation

_source: Software Engineering at Google page 198_

There are two types of documentation.

- **Reference documentation** covers the needy greedy details of a function, class, or API. It's like unit tests. Usually this lives with the code as comments.
- **Conceptual documentation** covers a higher level explanation of how a function, class, or API works. It's like integration tests. A good example of conceptual documentation is Google's guide for [`absl::StrFormat()`](https://abseil.io/docs/cpp/guides/format#abslstrformat). Usually this lives along with the code as `.md` files.
- **README** links to other pages for more information.

### Deprecating Documents

> At Google, we often attach "freshness dates" to documentation. Such documents note the last time a document was reviewed, and metadata in the documentation set will send email reminders when the document hasn't been touched in, for example, three months. Such freshness dates, as shown in the following example -- and tracking your documents as bugs -- can help make documentation set easier to maintain over time, which is the main concern for a document.
>
> ```html
> <!--*
> # Document freshness: For more information, see go/fresh-source.
> freshness: { owner: `username` reviewed: '2019-02-27'}
> *-->
> ```
>
> _source: [Software Engineering at Google chapter 10](https://abseil.io/resources/swe-book/html/ch10.html)_

I found this very relevant to my day to day job. At AppFolio, we have internal engineering wiki, but some of them are outdated.

💡 Idea: We could create a bot that scan all the files in `docs/` and look for the comment `freshness: { ... }`. Then, we parse the last reviewed date of that document. If it was last reviewd more than 3 months ago, the bot automatically creates a Github issue and requests for a documentation review.

### Properties common to all test sizes

> ... we also strongly discourage the use of control flow statements like conditionals and loops in a test (https://oreil.ly/fQSuk). More complex test flows risk containing bugs themselves and make it more difficult to determine the cause of a test failure.
>
> _source: [Software Engineering at Google chapter 11](https://abseil.io/resources/swe-book/html/ch11.html)_

This reminds me why I felt uncomfortable when I saw `for loop` in a test at work. It was too clever.

```java
// ❌
@Test
void canAppendOne() {
  List<String> args = List.of("foo", "bar", "book", "");
  args.forEach(arg -> assertEquals(arg + "1", appendOne(arg)));
}

// ✅
@Test
void canAppendOne() {
  assertEquals("foo1", appendOne("foo"));
  assertEquals("bar1", appendOne("bar"));
  assertEquals("book1", appendOne("book"));
  assertEquals("1", appendOne(""));
}
```

### Testing on the Toilet

> Of all the methods the Testing Grouplet used to try to improve testing at Google, perhaps none was more off-beat than Testing on the Toilet (TotT). The goal of TotT was fairly simple: actively raise awareness about testing across the entire company. The question is, what's the best way to do that in a company with employees scattered around the world?
>
> The Testing Grouplet considered the idea of a regular email newsletter, but given the heavy volume of email everyone deals with at Google, it was likely to become lost in the noise. After a little bit of brainstorming, someone prosed the idea of posting flyers in the restroom stalls as a joke. We quickly recognized the genius in it: the bathroom is one place that everyone must visit at lease once each day, no matterwhat. Joke or not, the idea was cheap enough to implement that it had to be tried.
>
> In April 2006, a short writeup covering how to imorove testing in Python appeared in restroom stalls across Google. This first episode was posted by a small band of colunteers. To say the reaction was polarized is an understatement; some saw it as an invation of personal space, and they objected strongly. Mailing lists lit ip with complaints, but the TotT creators were content: the people complaining were still talking about testing.
>
> _source: [Software Engineering at Google chapter 11](https://abseil.io/resources/swe-book/html/ch11.html)_

I'm quoting this here, so I can use this as a conversation starter 😂. Here's the [link](https://testing.googleblog.com/) to TotT.

### Test via Public API

> Define an appropriate scope for a unit and hence what should be considered the public API is more art than science, but here are some rules of thumb:
>
> - If a method or class exists only to support one or two other classes (i.e., it is a "helper class"), it probably shouldn't be considered its own unit, and its functionality should be tested through those classes instead of directly.
> - If a package or class is designed to be accessible by anyone without having to consult with its owners, it almost certainly constitutes a unit that should be tested directly, where its tests acess the uint in the same way that the users would.
> - If a package or class can be accessed only by the people who own it, but it is designed to provide a general piece of functionality useful in a range of contexts (i.e., it is a "support library"), it should also be considered a unit and tested directly. This will usually create some redundancy in testing given that the support library's code will be covered both by its own tests and the tests of its users. However, such redundancy can be valuable: without it, a gap in test coverage could be introduced if one of the library's users (and its tests) were ever removed.
>
> At Google, we've found that engineers sometimes need to be persuaded that testing via public APIs is better than testing against implementation details. The reluctance is understandable because it's often much easier to write tests focused on the piece of code you just wrote rather than figuring out how that code affects the system as a whole.
>
> _source: [Software Engineering at Google chapter 12](https://abseil.io/resources/swe-book/html/ch12.html)_

The first bullet point of mind blowing to me because I used to think "testing public APIs" means testing public methods of a class. But appearently, that's not the case.

### Test State, Not Interactions

> Another way that tests commonly depend on implementation details involves not which methods of the sytem the test calls, but how the results of those calls are verified. In general, there are two ways to verify that a system under test behaves as expected. With _state testing_, you observe the system itself to see what it looks like after invoking it. With _interaction testing_, you instead check that the system took an expected sequence of actions on its collaborators in response to invoking it (https://oreil.ly/3S8AL). Many tests will perform a combination of state and interaction validation.
>
> Interaction tests tend to be more brittle than state tests for the same reason that it's more brittle to test a private method than to test a public method: interaction tests check how a system arrived at its result, whereas usually you should care only _what_ the result is. Example 12-4 illustrates a test that uses a test double (explained further in Chapter 13) to verify how a system interacts with a database.
>
> _Example 12-4. A brittle interaction test_
>
> ```java
> @Test
> public void shouldWriteToDatabase() {
>   accounts.createUser("foobar");
>   verify(database).put("foobar");
> }
> ```
>
> The test verifies that a specific call was made against a database API, but there are a couple different ways it could go wrong:
>
> - If a bug in the system under test causes the record to be deleted from the database shortly after it was written, the test will pass even though we would have wanted it to fail.
> - If the system under test is refactored to call a slightly different API to write an equivalent record, the test will fail even though we would have wanted it to pass.
>
> It's much less brittle to directly test against the state of the system, as demonstrated in Example 12-5.
>
> _Example 12-5. Testing against state_
>
> ```java
> @Test
> public void shouldCreateUsers() {
>   accounts.createUser("foobar");
>   assertThat(accounts.getUser("foobar")).isNotNull();
> }
> ```
>
> This test more accurately expresses what we care about: the state of the system under test after interacting with it.
>
> The most common reason for problematic interaction tests is an over reliance on mocking frameworks. These frameworks make it easy to create test doubles that record and verify every call made against them, and to use those doubles in place of real objects in tests. This strategy leads directly to brittle interaction tests, and so we tend to prefer the use of real objects in favor of mocked objects, as long as the real objects are fast and deterministic.
>
> _source: [Software Engineering at Google chapter 12](https://abseil.io/resources/swe-book/html/ch12.html)_

This section of the book is a gem. At AppFolio, or at least in my current team, we do interaction testing heavily. The tests break when we introduce a small change most of the time, but now that I think about it, it was affecting our team's productivity negatively.

### Don't Put Logic in Tests

> Clear tests are trivially correct upon inspection; that is, it is obvious that a test is doing the correct thing just from glancing at it. This is possible in test code because each test needs to handle only a particular set of inputs, whereas production code must be generalized to handle any input. For production code, we're able to write tests that ensure complex logic is correct. But test code doesn't have that luxury -- if you feel like you need to write a test to verify your test, something has to gone wrong!
>
> Complexity is most often introduced in the form of _logic_. Logic is defined via the imperative parts of programming languages such as operators, loops, and conditionals. When a piece of code contains logic, you need to do a bit of mental computation to determine its result instead of just reading it off of the screen. It doesn't take much logic to make a test more difficult to reason about. For example, does the test in Example 12-15 look correct to you (https://oreil.ly/yJDqh)?
>
> _Example 12-15. Logic concealing a bug_
>
> ```java
> @Test
> public void shouldNavigateToAlbumsPage() {
>   String baseUrl = "http://photos.google.com/";
>   Navigator nav = new Navigator(baseUrl);
>   nav.goToAlbumPage();
>   assertThat(nav.getCurrentUrl()).isEqualTo(baseUrl + "/albums");
> }
> ```
>
> There's not much logic here: really just one string concatenation. But if we simplify the test by removing that one bit of logic, a bug immediately becomes clear, as demonstrated in Example 12-16.
>
> _Example 12-16. A text without logic reveals the bug_
>
> ```java
> @Test
> public void shouldNavigateToPhotosPage() {
>   Navigator nav = new Navigator("http://photos.google.com/");
>   nav.goToPhotosPage();
>   assertThat(nav.getCurrentUrl()).isEqualTo("http://photos.google.com//albums"); // Oops!
> }
> ```
>
> When the whole string is written out, we can see right away that we're expecting two slashes in the URL instead of just one. If the production code made a similar mistake, this test would fail to detect a bug. Duplicating the base URL was a small price to pay for making the test more descriptive and meaningful (see the discussion of DAMP versus DRY tests later in this chapter).
>
> If humans are bad at spotting bugs from string concatenation, we're ven worse at spotting bugs that come from more sophisticated programming constrcuts like loops and conditionals. The lession is clear: in test code, stick to straight-line code over clever logic, and consider tolerating some duplication when it makes the test more descriptive and meaningful. We'll discuss ideas around duplication and code sharing later in this chapter.
>
> _source: [Software Engineering at Google chapter 12](https://abseil.io/resources/swe-book/html/ch12.html)_

What's being written in this section all makes sense. I'm very glad the authors were able to put them in words because I wouldn't be able to -- Logics help us generalize our code in production with the cost of additional complexity. We generally don't need logics in tests because we only need to handle a specific input.

### Shared Values

> Engineers are usually drawn to using shared constants because constructing individual values in each test can be verbose. A better way to accomplish this goal is to construct data using helper methods (https://oreil.ly/Jc4VJ) (see Example 12-22) that require the test author to specify only values they care about, and setting reasonable defaults for all other values. This construction is trivial to do in languages that support named parameters, but language without named parameters can use constructs such as the _Builder_ pattern to emulate them (often with the assistance of tools such as AutoValue (http://oreil.ly.cVYK6)):
>
> ...
>
> In many cases, it can even be useful to slightly randomize the default values returned for fields that aren't explicitly set. This helps to ensure that two different instances won't accidentally compare as equal, and makes it more difficult for engineers to hardcode dependencies on the defaults.
>
> _source: [Software Engineering at Google chapter 12](https://abseil.io/resources/swe-book/html/ch12.html)_

At AppFolio, we already follow this pattern of creating shared objects, but we don't do randomization for the defaults.

💡 Idea: I might introduce this randomization feature to my team.

### Shared Setup

> A related way tha t tests shared code is via setup/initialization logic. Many test frameworks allow engineers to define methods to execute before each test in a suite is run. Used appropriately, these methods can make tests clearer and more concise by obviating the repetition of tedious and irrelevant initialization logic. Used inappropriately, these methods can harm a test’s completeness by hiding important details in a separate initialization method.
>
> The best use case for setup methods is to construct the object under tests and its collaborators. This is useful when the majority of tests don’t care about the specific arguments used to construct those objects and can let them stay in their default states. The same idea also applies to stubbing return values for test doubles, which is a concept that we explore in more detail in Test Doubles.
>
> One risk in using setup methods is that they can lead to unclear tests if those tests begin to depend on the particular values used in setup. For example, the test in Dependencies on values in setup methods seems incomplete because a reader of the test needs to go hunting to discover where the string "Donald Knuth" came from.
>
> Example 12-23. Dependencies on values in setup methods
>
> ```java
> private NameService nameService;
> private UserStore userStore;
>
> @Before
> public void setUp() {
>   nameService = new NameService();
>   nameService.set("user1", "Donald Knuth");
>   userStore = new UserStore(nameService);
> }
>
> // [... hundreds of lines of tests ...]
>
> @Test
> public void shouldReturnNameFromService() {
>   UserDetails user = userStore.get("user1");
>   assertThat(user.getName()).isEqualTo("Donald Knuth");
> }
> ```
>
> Tests like these that explicitly care about particular values should state those values directly, overriding the default defined in the setup method if need be. The resulting test contains slightly more repetition, as shown in Overriding values in setup methods, but the result is far more descriptive and meaningful.
>
> _source: [Software Engineering at Google chapter 12](https://abseil.io/resources/swe-book/html/ch12.html)_

This makes sense. I used to be not sure about what code should go in setup vs the test body. My philosophy was that try as much code as possible to put code in test body to be DAMP. For example, I would put `nameService = new NameService();` in every test. But appearently, it's okay to put a simple construction like this in the setup.

### Shared Helpers and Validation

> The last common way that code is shared across tests is via "helper methods" called from the body of the test methods. We already discussed how helper methods can be a useful way for concisely constructing test values—this usage is warranted, but other types of helper methods can be dangerous.
>
> One common type of helper is a method that performs a common set of assertions against a system under test. The extreme example is a validate method called at the end of every test method, which performs a set of fixed checks against the system under test. Such a validation strategy can be a bad habit to get into because tests using this approach are less behavior driven. With such tests, it is much more difficult to determine the intent of any particular test and to infer what exact case the author had in mind when writing it. When bugs are introduced, this strategy can also make them more difficult to localize because they will frequently cause a large number of tests to start failing.
>
> More focused validation methods can still be useful, however. The best validation helper methods assert a single conceptual fact about their inputs, in contrast to general-purpose validation methods that cover a range of conditions. Such methods can be particularly helpful when the condition that they are validating is conceptually simple but requires looping or conditional logic to implement that would reduce clarity were it included in the body of a test method. For example, the helper method in A conceptually simple test might be useful in a test covering several different cases around account access.
>
> Example 12-25. A conceptually simple test
>
> ```java
> private void assertUserHasAccessToAccount(User user, Account account) {
>   for (long userId : account.getUsersWithAccess()) {
>     if (user.getId() == userId) {
>       return;
>     }
>   }
>   fail(user.getName() + " cannot access " + account.getName());
> }
> ```
>
> _source: [Software Engineering at Google chapter 12](https://abseil.io/resources/swe-book/html/ch12.html)_

Good stuff here. I used to not know what logic is allowed to be a helper function in tests. But looks like if the assertion concept involves complex logic like `if/else` or `loop`, then should be a helper function.
