module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var chunk = require("./" + "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest() {
/******/ 		try {
/******/ 			var update = require("./" + "" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch (e) {
/******/ 			return Promise.resolve();
/******/ 		}
/******/ 		return Promise.resolve(update);
/******/ 	}
/******/
/******/ 	//eslint-disable-next-line no-unused-vars
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "3133a8564e93c71b875d";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (typeof dep === "undefined") hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (typeof dep === "undefined") hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./knexFile.js":
/*!*********************!*\
  !*** ./knexFile.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
const env = __webpack_require__(/*! dotenv */ "dotenv");
const path = __webpack_require__(/*! path */ "path");

/// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: IMPORT END

env.load(path.resolve(__dirname, '.env'));

const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB } =
Object({"NODE_ENV":"development"});

module.exports = {
  /// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: DEVELOPMENT
  development: {
    client: 'pg',
    connection: {
      database: POSTGRES_DB,
      host: POSTGRES_HOST,
      user: POSTGRES_USER,
      port: POSTGRES_PORT,
      password: POSTGRES_PASSWORD,
      charset: 'utf8' },

    debug: false,
    migrations: { tableName: 'migrations' },
    seeds: { directory: './seeds' } },

  /// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: PRODUCTION
  production: {
    client: 'pg',
    connection: {
      database: POSTGRES_DB,
      host: POSTGRES_HOST,
      user: POSTGRES_USER,
      port: POSTGRES_PORT,
      password: POSTGRES_PASSWORD,
      charset: 'utf8' },

    migrations: { tableName: 'migrations' },
    seeds: { directory: 'seeds' } },

  /// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: TESTING
  testing: {
    client: 'pg',
    connection: {
      database: POSTGRES_DB + '_' + process.pid,
      host: POSTGRES_HOST,
      user: POSTGRES_USER,
      port: POSTGRES_PORT,
      password: POSTGRES_PASSWORD,
      charset: 'utf8' },

    migrations: { tableName: 'migrations' },
    seeds: { directory: './seeds' } } };

/***/ }),

/***/ "./node_modules/webpack/hot/log-apply-result.js":
/*!*****************************************!*\
  !*** (webpack)/hot/log-apply-result.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 /*
              	MIT License http://www.opensource.org/licenses/mit-license.php
              	Author Tobias Koppers @sokra
              */
module.exports = function (updatedModules, renewedModules) {
	var unacceptedModules = updatedModules.filter(function (moduleId) {
		return renewedModules && renewedModules.indexOf(moduleId) < 0;
	});
	var log = __webpack_require__(/*! ./log */ "./node_modules/webpack/hot/log.js");

	if (unacceptedModules.length > 0) {
		log(
		"warning",
		"[HMR] The following modules couldn't be hot updated: (They would need a full reload!)");

		unacceptedModules.forEach(function (moduleId) {
			log("warning", "[HMR]  - " + moduleId);
		});
	}

	if (!renewedModules || renewedModules.length === 0) {
		log("info", "[HMR] Nothing hot updated.");
	} else {
		log("info", "[HMR] Updated modules:");
		renewedModules.forEach(function (moduleId) {
			if (typeof moduleId === "string" && moduleId.indexOf("!") !== -1) {
				var parts = moduleId.split("!");
				log.groupCollapsed("info", "[HMR]  - " + parts.pop());
				log("info", "[HMR]  - " + moduleId);
				log.groupEnd("info");
			} else {
				log("info", "[HMR]  - " + moduleId);
			}
		});
		var numberIds = renewedModules.every(function (moduleId) {
			return typeof moduleId === "number";
		});
		if (numberIds)
		log(
		"info",
		"[HMR] Consider using the NamedModulesPlugin for module names.");

	}
};

/***/ }),

/***/ "./node_modules/webpack/hot/log.js":
/*!****************************!*\
  !*** (webpack)/hot/log.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var logLevel = "info";

function dummy() {}

function shouldLog(level) {
	var shouldLog =
	logLevel === "info" && level === "info" ||
	["info", "warning"].indexOf(logLevel) >= 0 && level === "warning" ||
	["info", "warning", "error"].indexOf(logLevel) >= 0 && level === "error";
	return shouldLog;
}

function logGroup(logFn) {
	return function (level, msg) {
		if (shouldLog(level)) {
			logFn(msg);
		}
	};
}

module.exports = function (level, msg) {
	if (shouldLog(level)) {
		if (level === "info") {
			console.log(msg);
		} else if (level === "warning") {
			console.warn(msg);
		} else if (level === "error") {
			console.error(msg);
		}
	}
};

/* eslint-disable node/no-unsupported-features/node-builtins */
var group = console.group || dummy;
var groupCollapsed = console.groupCollapsed || dummy;
var groupEnd = console.groupEnd || dummy;
/* eslint-enable node/no-unsupported-features/node-builtins */

module.exports.group = logGroup(group);

module.exports.groupCollapsed = logGroup(groupCollapsed);

module.exports.groupEnd = logGroup(groupEnd);

module.exports.setLogLevel = function (level) {
	logLevel = level;
};

/***/ }),

/***/ "./node_modules/webpack/hot/poll.js?1000":
/*!**********************************!*\
  !*** (webpack)/hot/poll.js?1000 ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__resourceQuery) { /*
              	MIT License http://www.opensource.org/licenses/mit-license.php
              	Author Tobias Koppers @sokra
              */
/*globals __resourceQuery */
if (true) {
	var hotPollInterval = +__resourceQuery.substr(1) || 10 * 60 * 1000;
	var log = __webpack_require__(/*! ./log */ "./node_modules/webpack/hot/log.js");

	var checkForUpdate = function checkForUpdate(fromUpdate) {
		if (module.hot.status() === "idle") {
			module.hot.
			check(true).
			then(function (updatedModules) {
				if (!updatedModules) {
					if (fromUpdate) log("info", "[HMR] Update applied.");
					return;
				}
				__webpack_require__(/*! ./log-apply-result */ "./node_modules/webpack/hot/log-apply-result.js")(updatedModules, updatedModules);
				checkForUpdate(true);
			}).
			catch(function (err) {
				var status = module.hot.status();
				if (["abort", "fail"].indexOf(status) >= 0) {
					log("warning", "[HMR] Cannot apply update.");
					log("warning", "[HMR] " + (err.stack || err.message));
					log("warning", "[HMR] You need to restart the application!");
				} else {
					log(
					"warning",
					"[HMR] Update failed: " + (err.stack || err.message));

				}
			});
		}
	};
	setInterval(checkForUpdate, hotPollInterval);
} else {}
/* WEBPACK VAR INJECTION */}.call(this, "?1000"))

/***/ }),

/***/ "./src/Models/Token/TokenModel.js":
/*!****************************************!*\
  !*** ./src/Models/Token/TokenModel.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _Model = __webpack_require__(/*! ../../connectors/sql/Model */ "./src/connectors/sql/Model.js");var _Model2 = _interopRequireDefault(_Model);
var _UserModel = __webpack_require__(/*! ../User/UserModel */ "./src/Models/User/UserModel.js");var _UserModel2 = _interopRequireDefault(_UserModel);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

class TokenModel extends _Model2.default {}TokenModel.
tableName = 'tokens';TokenModel.
relationMappings = {
  collection: {
    relation: _Model2.default.HasOneRelation,
    modelClass: _UserModel2.default,
    join: {
      from: 'tokens.user_id',
      to: 'users.id' } } };



;exports.default =


TokenModel;

/***/ }),

/***/ "./src/Models/Token/TokenRepository.js":
/*!*********************************************!*\
  !*** ./src/Models/Token/TokenRepository.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};var _TokenModel = __webpack_require__(/*! ./TokenModel */ "./src/Models/Token/TokenModel.js");var _TokenModel2 = _interopRequireDefault(_TokenModel);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _asyncToGenerator(fn) {return function () {var gen = fn.apply(this, arguments);return new Promise(function (resolve, reject) {function step(key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {return Promise.resolve(value).then(function (value) {step("next", value);}, function (err) {step("throw", err);});}}return step("next");});};}exports.default =

{

  findOrUpdate(userId, tokens) {return _asyncToGenerator(function* () {
      const selected = ['jwt_access_token', 'jwt_refresh_token'];
      try {

        const fetched = yield _TokenModel2.default.query().where({ user_id: userId });

        // Update Token If UserId Exists and Fetch::::::::::::::::::::::::::::::::
        if (fetched.length !== 0) {

          yield _TokenModel2.default.query().patch(tokens);

          const tkns = _TokenModel2.default.query().where({ user_id: userId }).select(selected);
          return tkns;
        }
        // Create Token If User Id Does Not Exists and fetch::::::::::::::::::::::

        yield _TokenModel2.default.query().insert(_extends({ user_id: userId }, tokens));
        const tkns = yield _TokenModel2.default.query().where({ user_id: userId }).select(selected);
        return tkns;
      } catch (e) {
        console.log(e);
      }})();
  },
  getTokens(user_id) {return _asyncToGenerator(function* () {
      try {
        return yield _TokenModel2.default.query().where({ user_id });
      } catch (e) {
        console.log(e);
      }})();
  } };

/***/ }),

/***/ "./src/Models/User/UserModel.js":
/*!**************************************!*\
  !*** ./src/Models/User/UserModel.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _Model = __webpack_require__(/*! ../../connectors/sql/Model */ "./src/connectors/sql/Model.js");var _Model2 = _interopRequireDefault(_Model);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


class UserModel extends _Model2.default {}UserModel.
tableName = 'users';exports.default =


UserModel;

/***/ }),

/***/ "./src/Models/User/UserRepository.js":
/*!*******************************************!*\
  !*** ./src/Models/User/UserRepository.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _UserModel = __webpack_require__(/*! ./UserModel */ "./src/Models/User/UserModel.js");var _UserModel2 = _interopRequireDefault(_UserModel);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _asyncToGenerator(fn) {return function () {var gen = fn.apply(this, arguments);return new Promise(function (resolve, reject) {function step(key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {return Promise.resolve(value).then(function (value) {step("next", value);}, function (err) {step("throw", err);});}}return step("next");});};}


const propertyNameDecider = type => {
  switch (type) {
    case 'facebook':
      return 'facebook_profile_id';
    case 'google':
      return 'google_profile_id';}

};exports.default =


{
  addUser(userInfo, res) {return _asyncToGenerator(function* () {
      const fetched = yield _UserModel2.default.query().where({ email: userInfo.email });
      if (fetched.length === 0) {
        return yield _UserModel2.default.query().insertAndFetch(userInfo);
      } else
      {
        res.json({ error: 'Email is already in use' });
      }})();
  },
  getUserByEmail(email) {return _asyncToGenerator(function* () {
      return yield _UserModel2.default.query().where({ email });})();
  },
  getUserById(id) {return _asyncToGenerator(function* () {
      return yield _UserModel2.default.query().where({ id });})();
  },

  fetchByIdOrMail(id, email) {return _asyncToGenerator(function* () {
      const returnedFields = ['id', 'email', 'name', 'surname'];
      return yield yield _UserModel2.default.query().where(id ? id : false).
      orWhere(email ? { email } : false).
      select(returnedFields);})();
  },

  // ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  // Checks id from outh and email if oauth does not exists but email, updates the
  // user with the oauth logins. If doesnt existst creates a new entry in database
  // :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


  findOrCreate(model, userinfo, type) {var _this = this;return _asyncToGenerator(function* () {
      const returnedFields = ['id', 'email', 'name', 'surname'];
      const id = { [propertyNameDecider(type)]: model[propertyNameDecider(type)] };


      try {

        const fetched = yield _this.fetchByIdOrMail(id, model.email);


        if (fetched.length === 0) {
          const test = yield _UserModel2.default.query().
          insertAndFetch(userinfo).
          where(id).
          pick(returnedFields);
          return test;
        }

        if (userinfo.email && fetched[0].email === userinfo.email) {
          const email = userinfo.email;
          switch (type) {

            case 'facebook':
              const { facebook_profile_id, facebook_verified } = userinfo;
              yield _UserModel2.default.query().
              patch({ facebook_profile_id, facebook_verified }).
              where({ email });
              return yield _this.fetchByIdOrMail(id, model.email);

            case 'google':
              const { google_profile_id, google_verified } = userinfo;
              yield _UserModel2.default.query().
              patch({ google_profile_id, google_verified }).
              where({ email });
              return yield _this.fetchByIdOrMail(id, model.email);}

        }

        return fetched;
      } catch (e) {
        console.log(e);
      }})();
  } };

/***/ }),

/***/ "./src/Routes/Auth/index.js":
/*!**********************************!*\
  !*** ./src/Routes/Auth/index.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _express = __webpack_require__(/*! express */ "express");
var _Auth = __webpack_require__(/*! ../../Services/Auth */ "./src/Services/Auth/index.js");
var _utils = __webpack_require__(/*! ../utils */ "./src/Routes/utils/index.js");


const facebook = new _Auth.FacebookStrategy();
const google = new _Auth.GoogleStrategy();



const authRoutes = ({ config }) => {
  const router = (0, _express.Router)();

  // v1/auth/facebook/return ::::::::::::::::::::::::::::::::: Facebook callback


  router.get('/facebook/return',
  facebook.returnAuthenticate(), (req, res) => (0, _utils.generateResponse)(req, res));

  // v1/auth/facebook ::::::::::::::::::::::::::::::::::::::::::: Facebook Login

  router.get('/facebook', facebook.authenticate());

  // v1/auth/google/return ::::::::::::::::::::::::::::::::::::: Google CallBack

  router.get('/google/return', google.returnAuthenticate(),
  (req, res) => (0, _utils.generateResponse)(req, res));

  // v1/auth/google ::::::::::::::::::::::::::::::::::::::::::::::: Google Login

  router.get('/google', google.authenticate());



  return router;

};exports.default =

authRoutes;

/***/ }),

/***/ "./src/Routes/index.js":
/*!*****************************!*\
  !*** ./src/Routes/index.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _express = __webpack_require__(/*! express */ "express");var _express2 = _interopRequireDefault(_express);

var _Auth = __webpack_require__(/*! ./Auth */ "./src/Routes/Auth/index.js");var _Auth2 = _interopRequireDefault(_Auth);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


const router = (0, _express2.default)();

const config = {};


// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: MIDDLEWARES

//TODO Middle Wares Will Be Added Here

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: AUTH ROUTE
router.use('/auth', (0, _Auth2.default)({ config }));exports.default =


router;

/***/ }),

/***/ "./src/Routes/utils/index.js":
/*!***********************************!*\
  !*** ./src/Routes/utils/index.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });const generateResponse = exports.generateResponse = (req, res) => {
  const user = req.user;
  res.json({ user });
};

/***/ }),

/***/ "./src/Services/Auth/Strategies/Auth.js":
/*!**********************************************!*\
  !*** ./src/Services/Auth/Strategies/Auth.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};var _passport = __webpack_require__(/*! passport */ "passport");var _passport2 = _interopRequireDefault(_passport);
var _UserRepository = __webpack_require__(/*! ../../../Models/User/UserRepository */ "./src/Models/User/UserRepository.js");var _UserRepository2 = _interopRequireDefault(_UserRepository);
var _TokenRepository = __webpack_require__(/*! ../../../Models/Token/TokenRepository */ "./src/Models/Token/TokenRepository.js");var _TokenRepository2 = _interopRequireDefault(_TokenRepository);
var _Token = __webpack_require__(/*! ../Token */ "./src/Services/Auth/Token.js");var _Token2 = _interopRequireDefault(_Token);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _asyncToGenerator(fn) {return function () {var gen = fn.apply(this, arguments);return new Promise(function (resolve, reject) {function step(key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {return Promise.resolve(value).then(function (value) {step("next", value);}, function (err) {step("throw", err);});}}return step("next");});};}




class Auth {
  constructor(model) {
    this.usermodel = model || _UserRepository2.default;
    this.tokenmodel = model || _TokenRepository2.default;
  }

  // :::::::::::::::::::::::::::::::::::::::::::::::::::::::::: Internal Methods

  _propertyNameDecider(section, type) {
    switch (section) {
      case 'token':
        switch (type) {
          case 'facebook':
            return 'facebook_access_token';
          case 'google':
            return 'google_access_token';}

      case 'profile':
        switch (type) {
          case 'facebook':
            return 'facebook_profile_id';
          case 'google':
            return 'google_profile_id';}

      case 'provider':
        switch (type) {
          case 'facebook':
            return 'facebook_verified';
          case 'google':
            return 'google_verified';}}


  }

  _checkFields(obj) {
    return Object.values(obj).every(item => item);
  }

  _checkUserValidUser(user) {

    const check = this._checkFields(user);
    if (check) return _extends({}, user, { isCompleted: true });
    return user;
  }

  _createUserEntry(userinfo, type, cb) {var _this = this;return _asyncToGenerator(function* () {

      const { id, accessToken, name, surname, email } = userinfo;


      const userObj = {
        [_this._propertyNameDecider('profile', type)]: id,
        [_this._propertyNameDecider('provider', type)]: true,
        name,
        surname,
        email };


      const checkedUser = _this._checkUserValidUser(userObj, type);

      const returnedUser = yield _this.usermodel.findOrCreate({
        [_this._propertyNameDecider('profile', type)]: id,
        email },
      checkedUser, type);

      const user = returnedUser[0];

      const fieldCheck = _this._checkFields(user);

      yield _this._createToken({ fieldCheck, user, accessToken, type }, cb);})();
  }



  _createToken(params, cb) {var _this2 = this;return _asyncToGenerator(function* () {
      const { fieldCheck, user, accessToken, type } = params;

      if (fieldCheck) {
        const jwtToken = new _Token2.default();


        const [jwt_access_token, jwt_refresh_token] = yield jwtToken.createTokens(user);


        user.accessToken = jwt_access_token;
        user.refreshToken = jwt_refresh_token;
        user.isCompleted = true;
        yield _this2.tokenmodel.findOrUpdate(user.id, {
          jwt_access_token,
          jwt_refresh_token,
          [_this2._propertyNameDecider('token', type)]: accessToken });


        return cb(null, user);
      }

      return cb('Please fill profile details');})();
  }}exports.default =



Auth;

/***/ }),

/***/ "./src/Services/Auth/Strategies/FacebookStrategy.js":
/*!**********************************************************!*\
  !*** ./src/Services/Auth/Strategies/FacebookStrategy.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _passport = __webpack_require__(/*! passport */ "passport");var _passport2 = _interopRequireDefault(_passport);
var _passportFacebook = __webpack_require__(/*! passport-facebook */ "passport-facebook");
var _Auth = __webpack_require__(/*! ./Auth */ "./src/Services/Auth/Strategies/Auth.js");var _Auth2 = _interopRequireDefault(_Auth);
var _config = __webpack_require__(/*! ../../../config */ "./src/config/index.js");var _config2 = _interopRequireDefault(_config);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _asyncToGenerator(fn) {return function () {var gen = fn.apply(this, arguments);return new Promise(function (resolve, reject) {function step(key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {return Promise.resolve(value).then(function (value) {step("next", value);}, function (err) {step("throw", err);});}}return step("next");});};}


const defaultPermissions = ['user_friends', 'emails', 'public_profile'];
const fields = ['id', 'displayName', 'emails', 'first_name', 'middle_name', 'last_name'];




class FacebookStrategy extends _Auth2.default {
  constructor(clientID, clientSecret, callbackURL, permissions) {
    super();

    this.clientID = clientID || _config2.default.facebookClientID;
    this.clientSecret = clientSecret || _config2.default.facebookAppSecret;
    this.callbackURL = callbackURL || 'http://localhost:9090/v1/auth/facebook/return';
    this.permissions = permissions || defaultPermissions;
    this._strategy();
  }


  _strategy() {var _this = this;
    _passport2.default.use(new _passportFacebook.Strategy({
      clientID: this.clientID,
      clientSecret: this.clientSecret,
      callbackURL: this.callbackURL,
      enableProof: true,
      profileFields: fields }, (() => {var _ref = _asyncToGenerator(
      function* (accessToken, refreshToken, profile, cb) {

        const { id, name: { familyName, givenName }, email } = profile;
        const userinfo = { id, name: givenName, surname: familyName, email: email, accessToken };

        yield _this._createUserEntry(userinfo, 'facebook', cb);

      });return function (_x, _x2, _x3, _x4) {return _ref.apply(this, arguments);};})()));
  }


  returnAuthenticate() {
    return _passport2.default.authenticate('facebook', {
      session: false,
      authType: 'rerequest',
      scope: this.permissions });

  }



  authenticate() {
    return _passport2.default.authenticate('facebook', { session: false });
  }}exports.default =



FacebookStrategy;

/***/ }),

/***/ "./src/Services/Auth/Strategies/GoogleStrategy.js":
/*!********************************************************!*\
  !*** ./src/Services/Auth/Strategies/GoogleStrategy.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _passport = __webpack_require__(/*! passport */ "passport");var _passport2 = _interopRequireDefault(_passport);
var _passportGoogleOauth = __webpack_require__(/*! passport-google-oauth20 */ "passport-google-oauth20");
var _Auth = __webpack_require__(/*! ./Auth */ "./src/Services/Auth/Strategies/Auth.js");var _Auth2 = _interopRequireDefault(_Auth);
var _config = __webpack_require__(/*! ../../../config */ "./src/config/index.js");var _config2 = _interopRequireDefault(_config);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _asyncToGenerator(fn) {return function () {var gen = fn.apply(this, arguments);return new Promise(function (resolve, reject) {function step(key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {return Promise.resolve(value).then(function (value) {step("next", value);}, function (err) {step("throw", err);});}}return step("next");});};}

class GoogleStrategy extends _Auth2.default {
  constructor(clientID, clientSecret, callbackURL) {
    super();
    this.clientID = clientID || _config2.default.googleClientID;
    this.clientSecret = clientSecret || _config2.default.googleClientSecret;
    this.callbackURL = callbackURL || 'http://127.0.0.1:9090/v1/auth/google/return';
    this._stategy();
  }


  _stategy() {var _this = this;
    _passport2.default.use(new _passportGoogleOauth.Strategy({
      clientID: this.clientID,
      clientSecret: this.clientSecret,
      callbackURL: this.callbackURL }, (() => {var _ref = _asyncToGenerator(
      function* (accessToken, refreshToken, profile, cb) {


        const { id, name: { familyName, givenName }, emails } = profile;

        const userInfo = {
          id,
          name: givenName,
          surname: familyName,
          email: emails[0].value,
          accessToken };


        yield _this._createUserEntry(userInfo, 'google', cb);
      });return function (_x, _x2, _x3, _x4) {return _ref.apply(this, arguments);};})()));
  }


  authenticate() {
    return _passport2.default.authenticate('google', { session: false, scope: ['openid', 'email', 'profile'] });
  }


  returnAuthenticate() {
    return _passport2.default.authenticate('google', { session: false, failureRedirect: '/google' });
  }}exports.default =



GoogleStrategy;

//MwAJFmFJ2Shutv2yZHyfC2B97O0oECRfUxY1nA071YqRQf4fLPxku37KeSg3koQF0Y61GdM6KNvN9-MPNqkWUZg

/***/ }),

/***/ "./src/Services/Auth/Strategies/JWTStrategy.js":
/*!*****************************************************!*\
  !*** ./src/Services/Auth/Strategies/JWTStrategy.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _passport = __webpack_require__(/*! passport */ "passport");var _passport2 = _interopRequireDefault(_passport);
var _passportJwt = __webpack_require__(/*! passport-jwt */ "passport-jwt");
var _Auth = __webpack_require__(/*! ./Auth */ "./src/Services/Auth/Strategies/Auth.js");var _Auth2 = _interopRequireDefault(_Auth);
var _config = __webpack_require__(/*! ../../../config */ "./src/config/index.js");var _config2 = _interopRequireDefault(_config);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _asyncToGenerator(fn) {return function () {var gen = fn.apply(this, arguments);return new Promise(function (resolve, reject) {function step(key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {return Promise.resolve(value).then(function (value) {step("next", value);}, function (err) {step("throw", err);});}}return step("next");});};}


class JWTStrategy extends _Auth2.default {
  constructor(params, jwtSecret) {
    super();
    this.jwtSecret = jwtSecret || _config2.default.jwtAccessToken;
    this.params = params || {
      secretOrKey: this.jwtSecret,
      jwtFromRequest: _passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqToCallback: true };

    this._jwtStrategy();
  }
  _jwtStrategy() {var _this = this;
    _passport2.default.use(new _passportJwt.Strategy(params, (() => {var _ref = _asyncToGenerator(function* (payload, done) {
        _this.model.findOne({ id: payload.id }, function (err, user) {
          if (err) return done(err, false);
          if (user) return done(null, user || undefined);
          return done(null, false);
        });
      });return function (_x, _x2) {return _ref.apply(this, arguments);};})()));
  }
  authenticate() {
    return _passport2.default.authenticate('jwt', {
      session: false,
      secret: this.jwtSecret });

  }}exports.default =



(params, jwtSecret) => new JWTStrategy(params, jwtSecret);

/***/ }),

/***/ "./src/Services/Auth/Strategies/LocalStrategy.js":
/*!*******************************************************!*\
  !*** ./src/Services/Auth/Strategies/LocalStrategy.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _passport = __webpack_require__(/*! passport */ "passport");var _passport2 = _interopRequireDefault(_passport);
var _passportLocal = __webpack_require__(/*! passport-local */ "passport-local");
var _Auth = __webpack_require__(/*! ./Auth */ "./src/Services/Auth/Strategies/Auth.js");var _Auth2 = _interopRequireDefault(_Auth);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


class LocalStrategy extends _Auth2.default {
  constructor() {
    super();
    this._localStrategy();
  }
  _localStrategy() {
    _passport2.default.use(new _passportLocal.Strategy({
      usernameField: 'email',
      passportField: 'passport',
      session: false },
    (username, password, done) => {
      this.model.findOne({ username }, (err, user) => {
        if (err) return done(err);
        if (!user) return done(null, false, { message: 'Invalid Credentials' });
        if (!user.validatePassword(password)) return done(null, false, { message: 'Invalid Credentials' });
        return done(null, user);
      });
    }));
  }
  session() {
    return _passport2.default.session();
  }}
;exports.default =


new LocalStrategy();

/***/ }),

/***/ "./src/Services/Auth/Token.js":
/*!************************************!*\
  !*** ./src/Services/Auth/Token.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _jsonwebtoken = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _bcryptjs = __webpack_require__(/*! bcryptjs */ "bcryptjs");var _bcryptjs2 = _interopRequireDefault(_bcryptjs);
var _config = __webpack_require__(/*! ../../config */ "./src/config/index.js");var _config2 = _interopRequireDefault(_config);
var _UserRepository = __webpack_require__(/*! ../../Models/User/UserRepository */ "./src/Models/User/UserRepository.js");var _UserRepository2 = _interopRequireDefault(_UserRepository);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _asyncToGenerator(fn) {return function () {var gen = fn.apply(this, arguments);return new Promise(function (resolve, reject) {function step(key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {return Promise.resolve(value).then(function (value) {step("next", value);}, function (err) {step("throw", err);});}}return step("next");});};}

/// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: 

class Token {
  constructor(model, accessToken, refreshToken) {
    this.userModel = _UserRepository2.default;
    this.accessToken = accessToken || _config2.default.jwtAccessToken;
    this.refreshToken = refreshToken || _config2.default.jwtRefreshToken;
  }

  /// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: Creating Tokens
  createTokens(user) {var _this = this;return _asyncToGenerator(function* () {
      ;
      const accessToken = _jsonwebtoken2.default.sign({ user }, _this.accessToken, { expiresIn: '1m' });
      const refreshToken = _jsonwebtoken2.default.sign({ user }, _this.refreshToken, { expiresIn: '7d' });
      return Promise.all([accessToken, refreshToken]);})();
  }


  refreshTokens(accesToken, refreshToken) {var _this2 = this;return _asyncToGenerator(function* () {

      let userId = -1;
      try {
        const { user: { id } } = _jsonwebtoken2.default.decode(refreshToken);
        userId = id;
      } catch (e) {
        return {};
      }

      if (!userId) {
        return {};
      };

      const fetchedUser = yield _this2.userModel.getUserById(userId);
      const user = fetchedUser[0];
      if (!user) {
        return false;
      } else
      {
        const refreshSecret = _this2.refreshToken + (user.password ? user.password : "");
        try {
          _jsonwebtoken2.default.verify(refreshToken, refreshSecret);
        } catch (e) {
          return {};
        }
        const [newToken, newRefreshToken] = yield _this2.createTokens(user);
        return {
          token: newToken,
          refreshToken: newRefreshToken,
          user };

      }})();


  }


  loginWithToken(email, password) {var _this3 = this;return _asyncToGenerator(function* () {
      const user = yield _this3.model.findOne({ where: { email }, raw: true });
      if (!user) throw new Error('Invalid Credentials');else
      {
        const isValid = yield _bcryptjs2.default.compare(password, user.password);
        if (!isValid) throw new Error('Invalid Credentials');else
        {
          _this3.refreshToken = _this3.refreshToken + user.password;
          const [token, refreshToken] = yield _this3.createTokens(user);
          return { token, refreshToken };
        }
      }})();
  }}exports.default =



Token;

/***/ }),

/***/ "./src/Services/Auth/index.js":
/*!************************************!*\
  !*** ./src/Services/Auth/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.authWithLocal = exports.authWithJWT = exports.Token = exports.GoogleStrategy = exports.FacebookStrategy = undefined;var _FacebookStrategy = __webpack_require__(/*! ./Strategies/FacebookStrategy */ "./src/Services/Auth/Strategies/FacebookStrategy.js");var _FacebookStrategy2 = _interopRequireDefault(_FacebookStrategy);
var _GoogleStrategy = __webpack_require__(/*! ./Strategies/GoogleStrategy */ "./src/Services/Auth/Strategies/GoogleStrategy.js");var _GoogleStrategy2 = _interopRequireDefault(_GoogleStrategy);
var _JWTStrategy = __webpack_require__(/*! ./Strategies/JWTStrategy */ "./src/Services/Auth/Strategies/JWTStrategy.js");var _JWTStrategy2 = _interopRequireDefault(_JWTStrategy);
var _LocalStrategy = __webpack_require__(/*! ./Strategies/LocalStrategy */ "./src/Services/Auth/Strategies/LocalStrategy.js");var _LocalStrategy2 = _interopRequireDefault(_LocalStrategy);
var _Token = __webpack_require__(/*! ./Token */ "./src/Services/Auth/Token.js");var _Token2 = _interopRequireDefault(_Token);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}exports.


FacebookStrategy = _FacebookStrategy2.default;exports.
GoogleStrategy = _GoogleStrategy2.default;exports.
Token = _Token2.default;exports.
authWithJWT = _JWTStrategy2.default;exports.
authWithLocal = _LocalStrategy2.default;

/***/ }),

/***/ "./src/Services/Logger/index.js":
/*!**************************************!*\
  !*** ./src/Services/Logger/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _moment = __webpack_require__(/*! moment */ "moment");var _moment2 = _interopRequireDefault(_moment);
var _morgan = __webpack_require__(/*! morgan */ "morgan");var _morgan2 = _interopRequireDefault(_morgan);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


// Ip Address

_morgan2.default.token('ip', req => {
  return req.connection.remoteAddress.split(':')[3] ?
  req.connection.remoteAddress.split(':')[3] : 'localhost';
});

const devLogger = env => {
  if (env === 'development') {
    return (0, _morgan2.default)((tokens, req, res) => {
      return [
      tokens['ip'](req, res),
      '-',
      `[${(0, _moment2.default)().format('D/MMM/YYYY HH:mm:ss')}]`,
      '-',
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms'].
      join(' ');
    });
  }
};exports.default =


devLogger;

/***/ }),

/***/ "./src/config/index.js":
/*!*****************************!*\
  !*** ./src/config/index.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _dotenv = __webpack_require__(/*! dotenv */ "dotenv");var _dotenv2 = _interopRequireDefault(_dotenv);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

_dotenv2.default.load();

const isDevelopment = "development" === 'development';

const config = {
  facebookClientID: "239629546873627",
  facebookAppSecret: "38ff2621164baeb6a3d1f544f7581ac5",
  googleClientID: "97042491529-kng3n1j51qbbpfpgehutvj9s075u9843.apps.googleusercontent.com",
  googleClientSecret: "U3fqzCk-wRJQifbv7RkcJdpe",
  jwtSecret: Object({"NODE_ENV":"development"}).JWT_SECRET,
  jwtAccessToken: "secret",
  jwtRefreshToken: "secret2",
  apiPort: "9090" };exports.default =


config;

/***/ }),

/***/ "./src/connectors/sql/BaseModel.js":
/*!*****************************************!*\
  !*** ./src/connectors/sql/BaseModel.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _objection = __webpack_require__(/*! objection */ "objection");
var _moment = __webpack_require__(/*! moment */ "moment");var _moment2 = _interopRequireDefault(_moment);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

class BaseModel extends _objection.Model {


  $beforeInsert() {
    this._addTimeStamp('create');
  }

  $beforeUpdate() {
    this._addTimeStamp('update');
  }
  _addTimeStamp(action) {
    if (this.constructor.timestamp) {
      switch (action) {
        case 'create':
          this.created_at = (0, _moment2.default)().format('x');
          break;
        case 'update':
          this.updated_at = (0, _moment2.default)().format('x');
          break;}

    }
  }}BaseModel.timestamp = true;exports.default =



BaseModel;

/***/ }),

/***/ "./src/connectors/sql/Model.js":
/*!*************************************!*\
  !*** ./src/connectors/sql/Model.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.knexConfigEnv = exports.default = undefined;var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};var _knexFile = __webpack_require__(/*! ../../../knexFile */ "./knexFile.js");var _knexFile2 = _interopRequireDefault(_knexFile);
var _BaseModel = __webpack_require__(/*! ./BaseModel */ "./src/connectors/sql/BaseModel.js");var _BaseModel2 = _interopRequireDefault(_BaseModel);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


const environment = "development" || 'development';

const knexConfigEnv = _knexFile2.default[environment];

const knex = __webpack_require__(/*! knex */ "knex")(_extends({}, knexConfigEnv, { debug: false }));

_BaseModel2.default.knex(knex);exports.

default = _BaseModel2.default;exports.knexConfigEnv = knexConfigEnv;

/***/ }),

/***/ "./src/graphql/Mutations/index.js":
/*!****************************************!*\
  !*** ./src/graphql/Mutations/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _resolvers = __webpack_require__(/*! ./resolvers */ "./src/graphql/Mutations/resolvers.js");var _resolvers2 = _interopRequireDefault(_resolvers);
var _fs = __webpack_require__(/*! fs */ "fs");var _fs2 = _interopRequireDefault(_fs);
var _path = __webpack_require__(/*! path */ "path");var _path2 = _interopRequireDefault(_path);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}exports.default =



{
  schema: _fs2.default.readFileSync(_path2.default.resolve(__dirname, './mutations.graphql'), 'utf8'),
  resolvers: _resolvers2.default };

/***/ }),

/***/ "./src/graphql/Mutations/resolvers.js":
/*!********************************************!*\
  !*** ./src/graphql/Mutations/resolvers.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _hash = __webpack_require__(/*! ../../utils/hash */ "./src/utils/hash.js");var _hash2 = _interopRequireDefault(_hash);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _asyncToGenerator(fn) {return function () {var gen = fn.apply(this, arguments);return new Promise(function (resolve, reject) {function step(key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {return Promise.resolve(value).then(function (value) {step("next", value);}, function (err) {step("throw", err);});}}return step("next");});};}

const resolvers = {
  Mutation: {
    signUp(_, args, ctx) {return _asyncToGenerator(function* () {
        if (ctx.req.user) {
          throw new Error('Already Signed In');
        } else
        {
          const { input: { password, email, name, surname, age, birthday, gender } } = args;
          const hashedPassword = yield (0, _hash2.default)(password);
          const user = {
            email, name, surname, age, birthday, gender,
            password: hashedPassword, isCompleted: true };

          return yield ctx.UserModel.addUser(user, ctx.res);
        }})();
    },

    login(_, args, ctx) {
      return null;
    } } };exports.default =



resolvers;

/***/ }),

/***/ "./src/graphql/Queries/index.js":
/*!**************************************!*\
  !*** ./src/graphql/Queries/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _fs = __webpack_require__(/*! fs */ "fs");var _fs2 = _interopRequireDefault(_fs);
var _path = __webpack_require__(/*! path */ "path");var _path2 = _interopRequireDefault(_path);
var _resolvers = __webpack_require__(/*! ./resolvers */ "./src/graphql/Queries/resolvers.js");var _resolvers2 = _interopRequireDefault(_resolvers);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}exports.default =

{
  schema: _fs2.default.readFileSync(_path2.default.resolve(__dirname, './queries.graphql'), 'utf8'),
  resolvers: _resolvers2.default };

/***/ }),

/***/ "./src/graphql/Queries/resolvers.js":
/*!******************************************!*\
  !*** ./src/graphql/Queries/resolvers.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _isLoggedIn = __webpack_require__(/*! ../utils/isLoggedIn */ "./src/graphql/utils/isLoggedIn.js");var _isLoggedIn2 = _interopRequireDefault(_isLoggedIn);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _asyncToGenerator(fn) {return function () {var gen = fn.apply(this, arguments);return new Promise(function (resolve, reject) {function step(key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {return Promise.resolve(value).then(function (value) {step("next", value);}, function (err) {step("throw", err);});}}return step("next");});};}


const resolvers = {
  Query: {

    getTokens(_, args, ctx) {return _asyncToGenerator(function* () {
        return (0, _isLoggedIn2.default)(ctx.req, _asyncToGenerator(function* () {
          const { id } = ctx.req.user;
          const tokens = yield ctx.TokenModel.getTokens(id);
          return tokens[0];
        }));})();
    },
    getProfile(_, args, ctx) {
      return (0, _isLoggedIn2.default)(ctx.req, () => ctx.req.user);
    } } };exports.default =



resolvers;

/***/ }),

/***/ "./src/graphql/Token/index.js":
/*!************************************!*\
  !*** ./src/graphql/Token/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _fs = __webpack_require__(/*! fs */ "fs");var _fs2 = _interopRequireDefault(_fs);
var _path = __webpack_require__(/*! path */ "path");var _path2 = _interopRequireDefault(_path);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}exports.default =

{
  schema: _fs2.default.readFileSync(_path2.default.resolve(__dirname, './token.schema.graphql'), 'utf8') };

/***/ }),

/***/ "./src/graphql/User/index.js":
/*!***********************************!*\
  !*** ./src/graphql/User/index.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _fs = __webpack_require__(/*! fs */ "fs");var _fs2 = _interopRequireDefault(_fs);
var _path = __webpack_require__(/*! path */ "path");var _path2 = _interopRequireDefault(_path);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}exports.default =
{
  schema: _fs2.default.readFileSync(_path2.default.resolve(__dirname, './user.schema.graphql'), 'utf8') };

/***/ }),

/***/ "./src/graphql/index.js":
/*!******************************!*\
  !*** ./src/graphql/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.config = exports.default = undefined;var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};var _executeableSchema = __webpack_require__(/*! ./utils/executeableSchema */ "./src/graphql/utils/executeableSchema.js");var _executeableSchema2 = _interopRequireDefault(_executeableSchema);
var _User = __webpack_require__(/*! ./User */ "./src/graphql/User/index.js");var _User2 = _interopRequireDefault(_User);
var _Token = __webpack_require__(/*! ./Token */ "./src/graphql/Token/index.js");var _Token2 = _interopRequireDefault(_Token);
var _Queries = __webpack_require__(/*! ./Queries */ "./src/graphql/Queries/index.js");var _Queries2 = _interopRequireDefault(_Queries);
var _Mutations = __webpack_require__(/*! ./Mutations */ "./src/graphql/Mutations/index.js");var _Mutations2 = _interopRequireDefault(_Mutations);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const config = {
  typeDefs: [
  _Queries2.default.schema,
  _Mutations2.default.schema,
  _User2.default.schema,
  _Token2.default.schema].
  join('\n'),
  resolver: _extends({}, _Queries2.default.resolvers, _Mutations2.default.resolvers),
  context: {} };


const executedSchema = (0, _executeableSchema2.default)(config.typeDefs, config.resolver);exports.


default = executedSchema;exports.config = config;

/***/ }),

/***/ "./src/graphql/utils/executeableSchema.js":
/*!************************************************!*\
  !*** ./src/graphql/utils/executeableSchema.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _graphqlTools = __webpack_require__(/*! graphql-tools */ "graphql-tools");


const executeableSchema = (typeDefs, resolvers) =>
(0, _graphqlTools.makeExecutableSchema)({ typeDefs, resolvers });exports.default =


executeableSchema;

/***/ }),

/***/ "./src/graphql/utils/isLoggedIn.js":
/*!*****************************************!*\
  !*** ./src/graphql/utils/isLoggedIn.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

// ::::::::::::::::::::::::::::::: GraphQl Middleware To Check If User Logged In


const isLoggedIn = (req, cb) => {
  if (req.user && req.user.isCompleted) {

    return cb();
  } else
  {
    if (!req.user.isCompleted) throw new Error('Please Complete Registration');else
    {
      throw new Error('Please Login');
    }
  }
};exports.default =


isLoggedIn;

/***/ }),

/***/ "./src/middlewares/token/index.js":
/*!****************************************!*\
  !*** ./src/middlewares/token/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _jsonwebtoken = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _Auth = __webpack_require__(/*! ../../Services/Auth */ "./src/Services/Auth/index.js");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _asyncToGenerator(fn) {return function () {var gen = fn.apply(this, arguments);return new Promise(function (resolve, reject) {function step(key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {return Promise.resolve(value).then(function (value) {step("next", value);}, function (err) {step("throw", err);});}}return step("next");});};}



const userTokenValidation = accessTokenSecret => (() => {var _ref = _asyncToGenerator(
  function* (req, res, next) {
    const tokenManager = new _Auth.Token();
    const token = req.headers['x-token'];
    if (token) {
      try {
        const { user } = _jsonwebtoken2.default.verify(token, accessTokenSecret);
        req.user = user;
      } catch (err) {
        const refreshToken = req.headers['x-refresh-token'];
        const newTokens = yield tokenManager.refreshTokens(token, refreshToken);
        if (newTokens.token && newTokens.refreshToken) {

          res.set('Access-Control-Expose-Headers', 'x-token, x-refresh-token');
          res.set('x-token', newTokens.token);
          res.set('x-refresh-token', newTokens.refreshToken);
        } else
        {
          res.send({ error: "Invalid Token" });
        }
        req.user = newTokens.user;
      }
    }
    next();
  });return function (_x, _x2, _x3) {return _ref.apply(this, arguments);};})();exports.default =

userTokenValidation;

/***/ }),

/***/ "./src/server.js":
/*!***********************!*\
  !*** ./src/server.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _express = __webpack_require__(/*! express */ "express");var _express2 = _interopRequireDefault(_express);
var _bodyParser = __webpack_require__(/*! body-parser */ "body-parser");var _bodyParser2 = _interopRequireDefault(_bodyParser);
var _Logger = __webpack_require__(/*! ./Services/Logger */ "./src/Services/Logger/index.js");var _Logger2 = _interopRequireDefault(_Logger);
var _passport = __webpack_require__(/*! passport */ "passport");var _passport2 = _interopRequireDefault(_passport);

var _token = __webpack_require__(/*! ./middlewares/token */ "./src/middlewares/token/index.js");var _token2 = _interopRequireDefault(_token);
var _config = __webpack_require__(/*! ./config */ "./src/config/index.js");var _config2 = _interopRequireDefault(_config);
var _expressGraphql = __webpack_require__(/*! express-graphql */ "express-graphql");var _expressGraphql2 = _interopRequireDefault(_expressGraphql);
var _graphql = __webpack_require__(/*! ./graphql */ "./src/graphql/index.js");var _graphql2 = _interopRequireDefault(_graphql);
var _Routes = __webpack_require__(/*! ./Routes */ "./src/Routes/index.js");var _Routes2 = _interopRequireDefault(_Routes);

var _UserRepository = __webpack_require__(/*! ./Models/User/UserRepository */ "./src/Models/User/UserRepository.js");var _UserRepository2 = _interopRequireDefault(_UserRepository);
var _TokenRepository = __webpack_require__(/*! ./Models/Token/TokenRepository */ "./src/Models/Token/TokenRepository.js");var _TokenRepository2 = _interopRequireDefault(_TokenRepository);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const server = (0, _express2.default)();

server.use(_bodyParser2.default.json());

server.use((0, _Logger2.default)("development"));

server.use(_passport2.default.initialize());


server.use('/v1', _Routes2.default);

server.use((0, _token2.default)(_config2.default.jwtAccessToken));

server.use('/graphql', (0, _expressGraphql2.default)((req, res) => {
  return {
    graphiql: true,
    schema: _graphql2.default,
    context: {
      req,
      res,
      UserModel: _UserRepository2.default,
      TokenModel: _TokenRepository2.default } };


}));

server.listen(_config2.default.apiPort, err => {
  if (err) {console.log(err);} else
  {console.log(`🚀Server is ready on ${_config2.default.apiPort} 🛸`);};
});

/***/ }),

/***/ "./src/utils/hash.js":
/*!***************************!*\
  !*** ./src/utils/hash.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


var _bcryptjs = __webpack_require__(/*! bcryptjs */ "bcryptjs");var _bcryptjs2 = _interopRequireDefault(_bcryptjs);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const hash = param => {
  return new Promise((resolve, reject) => {
    _bcryptjs2.default.genSalt(10, (err, salt) => {
      if (err) reject(err);
      _bcryptjs2.default.hash(param, salt, (err, hash) => {
        if (err) reject(err);
        resolve(hash);
      });
    });
  });
}; //@flow/////////////////////////////////////////////////////////////////////////
exports.default =

hash;

/***/ }),

/***/ 0:
/*!***************************************************************!*\
  !*** multi webpack/hot/poll?1000 babel-polyfill ./src/server ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! webpack/hot/poll?1000 */"./node_modules/webpack/hot/poll.js?1000");
__webpack_require__(/*! babel-polyfill */"babel-polyfill");
module.exports = __webpack_require__(/*! /Users/cryptopickle/Desktop/GraphQL-Auth-Example/src/server */"./src/server.js");


/***/ }),

/***/ "babel-polyfill":
/*!*********************************!*\
  !*** external "babel-polyfill" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),

/***/ "bcryptjs":
/*!***************************!*\
  !*** external "bcryptjs" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("bcryptjs");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "express-graphql":
/*!**********************************!*\
  !*** external "express-graphql" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express-graphql");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "graphql-tools":
/*!********************************!*\
  !*** external "graphql-tools" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("graphql-tools");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "knex":
/*!***********************!*\
  !*** external "knex" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("knex");

/***/ }),

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),

/***/ "objection":
/*!****************************!*\
  !*** external "objection" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("objection");

/***/ }),

/***/ "passport":
/*!***************************!*\
  !*** external "passport" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),

/***/ "passport-facebook":
/*!************************************!*\
  !*** external "passport-facebook" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("passport-facebook");

/***/ }),

/***/ "passport-google-oauth20":
/*!******************************************!*\
  !*** external "passport-google-oauth20" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("passport-google-oauth20");

/***/ }),

/***/ "passport-jwt":
/*!*******************************!*\
  !*** external "passport-jwt" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("passport-jwt");

/***/ }),

/***/ "passport-local":
/*!*********************************!*\
  !*** external "passport-local" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("passport-local");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ })

/******/ });