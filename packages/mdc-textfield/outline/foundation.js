/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import MDCFoundation from '@material/base/foundation';
import MDCTextFieldOutlineAdapter from './adapter';
import {cssClasses, strings} from './constants';

/**
 * @extends {MDCFoundation<!MDCTextFieldOutlineAdapter>}
 * @final
 */
class MDCTextFieldOutlineFoundation extends MDCFoundation {
  /** @return enum {string} */
  static get cssClasses() {
    return cssClasses;
  }

  /** @return enum {string} */
  static get strings() {
    return strings;
  }

  /**
   * {@see MDCTextFieldOutlineAdapter} for typing information on parameters and return
   * types.
   * @return {!MDCTextFieldOutlineAdapter}
   */
  static get defaultAdapter() {
    return /** @type {!MDCTextFieldOutlineAdapter} */ ({
    });
  }

  /**
   * @param {!MDCTextFieldOutlineAdapter=} adapter
   */
  constructor(adapter = /** @type {!MDCTextFieldOutlineAdapter} */ ({})) {
    super(Object.assign(MDCTextFieldOutlineFoundation.defaultAdapter, adapter));
  }

  /**
   * Updates the SVG path of the focused outline.
   */
  updateSvgPath(width, height, labelWidth, radius) {
    const path = 'M' + labelWidth + ',' + 1
       + 'h' + (width - radius - labelWidth - 2)
       + 'a' + radius + ',' + radius + ' 0 0 1 ' + radius + ',' + radius
       + 'v' + (height - 3 * radius)
       + 'a' + radius + ',' + radius + ' 0 0 1 ' + -radius + ',' + radius
       + 'h' + (-width + 2.7 * radius)
       + 'a' + radius + ',' + radius + ' 0 0 1 ' + -radius + ',' + -radius
       + 'v' + (-height + 3 * radius)
       + 'a' + radius + ',' + radius + ' 0 0 1 ' + radius + ',' + -radius
       + 'h' + 6;

    this.adapter_.setOutlinePathAttr(path);
  }
}

export default MDCTextFieldOutlineFoundation;