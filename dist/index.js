/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 25:
/***/ ((module) => {

/**
 * Returns a random emoji from an array of emojis.
 *
 * @returns {string} A random emoji from the array.
 *
 * @example
 * const randomEmote = getRandomEmote();
 * console.log(randomEmote); // Output: a random emoji from the array
 */
function getRandomEmote() {
    const emotes = ["😊", "🫡", "🥺", "🥳", "🤯", "😂", "😃", "🔥", "🤩", "✨"];
    const randomIndex = Math.floor(Math.random() * emotes.length);
    return emotes[randomIndex];
  }
  
  const features = [
    `https://emojik.vercel.app/s/😎_${getRandomEmote()}?size=128`,
  ];
  
  const reviewEmotes = [
    `https://emojik.vercel.app/s/🧐_${getRandomEmote()}?size=128`,
  ];
  
  const fixes = [`https://emojik.vercel.app/s/🤓_${getRandomEmote()}?size=128`];
  
  const defaults = [
    `https://emojik.vercel.app/s/😁_${getRandomEmote()}?size=128`,
  ];
  
  
  /* The code `module.exports` is used in Node.js to export variables, objects, or functions from a
  module so that they can be used in other modules. In this case, the code is exporting an object that
  contains four arrays: `reviewEmotes`, `features`, `fixes`, and `defaults`. These arrays contain URLs
  of images with emojis, generated using the `getRandomEmote()` function. The exported object can be
  imported and used in other modules by using the `require()` function. */
  
  module.exports = {
    reviewEmotes,
    features,
    fixes,
    defaults,
  };
//   using comment to test the workflow

/***/ }),

/***/ 705:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { features, fixes, defaults} = __nccwpck_require__(25);
/**
 * * The getEmoteUrl function takes an array of emotes and returns a random emote URL from the array.
 * @param {Array} emoteArray- An array of emotes.
 * @returns {String}
 */
/**

 */
const getEmoteUrl = (emoteArray) =>
  emoteArray[Math.floor(Math.random() * emoteArray.length)];

/**
 * @param {String} prTitle
 *
 * @returns {String}
 */
/*
 * Generates an emote based on the given pull request title.
 * @param {string} prTitle - The title of the pull request.
 * @returns {string} - A string containing an image URL of the generated emote.
 */
const generateEmote = (prTitle) => {
  let emoteArray = defaults;

  if (prTitle.match(/Feat|FEAT|feat/)) {
    emoteArray = features;
  } else if (prTitle.match(/Fix|FIX|fix/)) {
    emoteArray = fixes;
  }

  return `![emote](${getEmoteUrl(emoteArray)})`;
};

module.exports = generateEmote;

//Example Usage
// const prTitle = "Fix bug in login feature";
// const emote = generateEmote(prTitle);
// console.log(emote);
// Output: ![emote](<random emote URL>)

/***/ }),

/***/ 242:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 972:
/***/ ((module) => {

module.exports = eval("require")("@actions/github");


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const core = __nccwpck_require__(242);
const github = __nccwpck_require__(972);
const generateEmote = __nccwpck_require__(705);

async function run() {
  try {
    const githubToken = core.getInput("GITHUB_TOKEN");

    const { context } = github;
    if (context.payload.pull_request == null) {
      core.setFailed("No pull request found.");
    }

    const pullRequestNumber = context.payload.pull_request.number;
    const prTitle = context.payload.pull_request.title;
    const octokit = new github.GitHub(githubToken);
    const message = generateEmote(prTitle);

    octokit.issues.createComment({
      ...context.repo,
      issue_number: pullRequestNumber,
      body: message,
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
})();

module.exports = __webpack_exports__;
/******/ })()
;