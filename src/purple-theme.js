export const purple = {
	name: 'purple',
	properties: {
		// =~= Theme Properties =~=
		"--theme-font-family-base": `Geist, Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
		"--theme-font-family-heading": `Geist, Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
		"--theme-font-color-base": "var(--color-surface-700)",
		"--theme-font-color-dark": "var(--color-primary-300)",
		"--theme-rounded-base": "16px",
		"--theme-rounded-container": "16px",
		"--theme-border-base": "2px",

		// =~= Theme On-X Colors =~=
		"--on-primary": "var(--color-primary-50)",
		"--on-secondary": "var(--color-primary-50)",
		"--on-tertiary": "var(--color-primary-50)",
		"--on-success": "var(--color-primary-50)",
		"--on-warning": "var(--color-primary-50)",
		"--on-error": "var(--color-primary-50)",
		"--on-surface": "var(--color-primary-50)",
		// =~= Theme Colors  =~=
		// primary | #616161 
		"--color-primary-50": "231 231 231", // #e7e7e7
		"--color-primary-100": "223 223 223", // #dfdfdf
		"--color-primary-200": "216 216 216", // #d8d8d8
		"--color-primary-300": "192 192 192", // #c0c0c0
		"--color-primary-400": "144 144 144", // #909090
		"--color-primary-500": "97 97 97", // #616161
		"--color-primary-600": "87 87 87", // #575757
		"--color-primary-700": "73 73 73", // #494949
		"--color-primary-800": "58 58 58", // #3a3a3a
		"--color-primary-900": "48 48 48", // #303030
		// secondary | #6d4d93 
		"--color-secondary-50": "233 228 239", // #e9e4ef
		"--color-secondary-100": "226 219 233", // #e2dbe9
		"--color-secondary-200": "219 211 228", // #dbd3e4
		"--color-secondary-300": "197 184 212", // #c5b8d4
		"--color-secondary-400": "153 130 179", // #9982b3
		"--color-secondary-500": "109 77 147", // #6d4d93
		"--color-secondary-600": "98 69 132", // #624584
		"--color-secondary-700": "82 58 110", // #523a6e
		"--color-secondary-800": "65 46 88", // #412e58
		"--color-secondary-900": "53 38 72", // #352648
		// tertiary | #51419f 
		"--color-tertiary-50": "229 227 241", // #e5e3f1
		"--color-tertiary-100": "220 217 236", // #dcd9ec
		"--color-tertiary-200": "212 208 231", // #d4d0e7
		"--color-tertiary-300": "185 179 217", // #b9b3d9
		"--color-tertiary-400": "133 122 188", // #857abc
		"--color-tertiary-500": "81 65 159", // #51419f
		"--color-tertiary-600": "73 59 143", // #493b8f
		"--color-tertiary-700": "61 49 119", // #3d3177
		"--color-tertiary-800": "49 39 95", // #31275f
		"--color-tertiary-900": "40 32 78", // #28204e
		// success | #245c26 
		"--color-success-50": "222 231 222", // #dee7de
		"--color-success-100": "211 222 212", // #d3ded4
		"--color-success-200": "200 214 201", // #c8d6c9
		"--color-success-300": "167 190 168", // #a7bea8
		"--color-success-400": "102 141 103", // #668d67
		"--color-success-500": "36 92 38", // #245c26
		"--color-success-600": "32 83 34", // #205322
		"--color-success-700": "27 69 29", // #1b451d
		"--color-success-800": "22 55 23", // #163717
		"--color-success-900": "18 45 19", // #122d13
		// warning | #7d4926 
		"--color-warning-50": "236 228 222", // #ece4de
		"--color-warning-100": "229 219 212", // #e5dbd4
		"--color-warning-200": "223 210 201", // #dfd2c9
		"--color-warning-300": "203 182 168", // #cbb6a8
		"--color-warning-400": "164 128 103", // #a48067
		"--color-warning-500": "125 73 38", // #7d4926
		"--color-warning-600": "113 66 34", // #714222
		"--color-warning-700": "94 55 29", // #5e371d
		"--color-warning-800": "75 44 23", // #4b2c17
		"--color-warning-900": "61 36 19", // #3d2413
		// error | #652525 
		"--color-error-50": "232 222 222", // #e8dede
		"--color-error-100": "224 211 211", // #e0d3d3
		"--color-error-200": "217 201 201", // #d9c9c9
		"--color-error-300": "193 168 168", // #c1a8a8
		"--color-error-400": "147 102 102", // #936666
		"--color-error-500": "101 37 37", // #652525
		"--color-error-600": "91 33 33", // #5b2121
		"--color-error-700": "76 28 28", // #4c1c1c
		"--color-error-800": "61 22 22", // #3d1616
		"--color-error-900": "49 18 18", // #311212
		// surface | #303030 
		"--color-surface-50": "224 224 224", // #e0e0e0
		"--color-surface-100": "214 214 214", // #d6d6d6
		"--color-surface-200": "203 203 203", // #cbcbcb
		"--color-surface-300": "172 172 172", // #acacac
		"--color-surface-400": "110 110 110", // #6e6e6e
		"--color-surface-500": "48 48 48", // #303030
		"--color-surface-600": "43 43 43", // #2b2b2b
		"--color-surface-700": "36 36 36", // #242424
		"--color-surface-800": "29 29 29", // #1d1d1d
		"--color-surface-900": "24 24 24", // #181818
		// // =~= Theme On-X Colors =~=
		// "--on-primary": "var(--color-secondary-50)",
		// "--on-secondary": "var(--color-secondary-50)",
		// "--on-tertiary": "var(--color-secondary-50)",
		// "--on-success": "var(--color-surface-900)",
		// "--on-warning": "var(--color-surface-900)",
		// "--on-error": "var(--color-surface-900)",
		// "--on-surface": "var(--color-primary-50)",
		// // =~= Theme Colors  =~=
		// // primary | #616161 
		// "--color-primary-50": "231 231 231", // #e7e7e7
		// "--color-primary-100": "223 223 223", // #dfdfdf
		// "--color-primary-200": "216 216 216", // #d8d8d8
		// "--color-primary-300": "192 192 192", // #c0c0c0
		// "--color-primary-400": "144 144 144", // #909090
		// "--color-primary-500": "97 97 97", // #616161
		// "--color-primary-600": "87 87 87", // #575757
		// "--color-primary-700": "73 73 73", // #494949
		// "--color-primary-800": "58 58 58", // #3a3a3a
		// "--color-primary-900": "48 48 48", // #303030
		// // secondary | #6d4d93 
		// "--color-secondary-50": "233 228 239", // #e9e4ef
		// "--color-secondary-100": "226 219 233", // #e2dbe9
		// "--color-secondary-200": "219 211 228", // #dbd3e4
		// "--color-secondary-300": "197 184 212", // #c5b8d4
		// "--color-secondary-400": "153 130 179", // #9982b3
		// "--color-secondary-500": "109 77 147", // #6d4d93
		// "--color-secondary-600": "98 69 132", // #624584
		// "--color-secondary-700": "82 58 110", // #523a6e
		// "--color-secondary-800": "65 46 88", // #412e58
		// "--color-secondary-900": "53 38 72", // #352648
		// // tertiary | #533caf 
		// "--color-tertiary-50": "229 226 243", // #e5e2f3
		// "--color-tertiary-100": "221 216 239", // #ddd8ef
		// "--color-tertiary-200": "212 206 235", // #d4ceeb
		// "--color-tertiary-300": "186 177 223", // #bab1df
		// "--color-tertiary-400": "135 119 199", // #8777c7
		// "--color-tertiary-500": "83 60 175", // #533caf
		// "--color-tertiary-600": "75 54 158", // #4b369e
		// "--color-tertiary-700": "62 45 131", // #3e2d83
		// "--color-tertiary-800": "50 36 105", // #322469
		// "--color-tertiary-900": "41 29 86", // #291d56
		// // success | #5dee60 
		// "--color-success-50": "231 252 231", // #e7fce7
		// "--color-success-100": "223 252 223", // #dffcdf
		// "--color-success-200": "215 251 215", // #d7fbd7
		// "--color-success-300": "190 248 191", // #bef8bf
		// "--color-success-400": "142 243 144", // #8ef390
		// "--color-success-500": "93 238 96", // #5dee60
		// "--color-success-600": "84 214 86", // #54d656
		// "--color-success-700": "70 179 72", // #46b348
		// "--color-success-800": "56 143 58", // #388f3a
		// "--color-success-900": "46 117 47", // #2e752f
		// // warning | #fba441 
		// "--color-warning-50": "254 241 227", // #fef1e3
		// "--color-warning-100": "254 237 217", // #feedd9
		// "--color-warning-200": "254 232 208", // #fee8d0
		// "--color-warning-300": "253 219 179", // #fddbb3
		// "--color-warning-400": "252 191 122", // #fcbf7a
		// "--color-warning-500": "251 164 65", // #fba441
		// "--color-warning-600": "226 148 59", // #e2943b
		// "--color-warning-700": "188 123 49", // #bc7b31
		// "--color-warning-800": "151 98 39", // #976227
		// "--color-warning-900": "123 80 32", // #7b5020
		// // error | #fd5858 
		// "--color-error-50": "255 230 230", // #ffe6e6
		// "--color-error-100": "255 222 222", // #ffdede
		// "--color-error-200": "255 213 213", // #ffd5d5
		// "--color-error-300": "254 188 188", // #febcbc
		// "--color-error-400": "254 138 138", // #fe8a8a
		// "--color-error-500": "253 88 88", // #fd5858
		// "--color-error-600": "228 79 79", // #e44f4f
		// "--color-error-700": "190 66 66", // #be4242
		// "--color-error-800": "152 53 53", // #983535
		// "--color-error-900": "124 43 43", // #7c2b2b
		// // surface | #303030 
		// "--color-surface-50": "224 224 224", // #e0e0e0
		// "--color-surface-100": "214 214 214", // #d6d6d6
		// "--color-surface-200": "203 203 203", // #cbcbcb
		// "--color-surface-300": "172 172 172", // #acacac
		// "--color-surface-400": "110 110 110", // #6e6e6e
		// "--color-surface-500": "48 48 48", // #303030
		// "--color-surface-600": "43 43 43", // #2b2b2b
		// "--color-surface-700": "36 36 36", // #242424
		// "--color-surface-800": "29 29 29", // #1d1d1d
		// "--color-surface-900": "24 24 24", // #181818

	}
}