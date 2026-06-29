const team = [
	{
		name: 'Sandeep Saha',
		git: 'https://github.com/sandeepsaha232-eng',
		avatar: 'https://github.com/sandeepsaha232-eng.png',
		skills: ['css', 'js', 'html', 'java', 'cpp']
	},
	{
		name: 'SHARATH KUMAR RAJU MUDDULURI',
		git: 'https://github.com/sharathkumarrajum1289',
		avatar: 'https://github.com/sharathkumarrajum1289.png',
		skills: ['css', 'js', 'html', 'java', 'cpp']
	},
	{
		name: 'Kshiteesh Pandey',
		git: 'https://github.com/kshiteesh776-code',
		avatar: 'https://github.com/kshiteesh776-code.png',
		skills: ['css', 'js', 'html', 'java', 'cpp']
	},
	{
		name: 'Kanne Lakshmi Kanth',
		git: 'https://github.com/lakshmikanth257-cyber',
		avatar: 'https://github.com/lakshmikanth257-cyber.png',
		skills: ['css', 'js', 'html', 'java', 'cpp']
	}
];

const projects = [
	{
		title: 'kanbar-board',
		repo: 'https://github.com/sandeepsaha232-eng/kanbar-board',
		live: 'https://kanbar-board-steel.vercel.app/',
		desc: 'A Trello-style board with To Do, In Progress, and Done. State persists in localStorage.'
	},
	{
		title: 'Expense-Tracker-CRUD-localStorage',
		repo: 'https://github.com/sandeepsaha232-eng/Expense-Tracker-CRUD-localStorage',
		live: 'https://expense-tracker-crud-local-storage.vercel.app/',
		desc: 'Log income and expenses with full CRUD. Data persists in localStorage.'
	},
	{
		title: 'Interactive Quiz App',
		repo: 'https://github.com/sandeepsaha232-eng/INTERACTIVE-QUIZ-GAME',
		live: 'https://interactivequizgame-eight.vercel.app/',
		desc: 'Multiple-choice quiz with running score and final percentage.'
	},
	{
		title: 'Live News Feed',
		repo: 'https://github.com/kshiteesh776-code/News_Dashboard',
		live: '#',
		desc: 'News aggregator using async fetch, loading states, and filters.'
	},
	{
		title: 'GitHub Developer Explorer',
		repo: 'https://github.com/sharathkumarrajum1289/GitDevExplorer',
		live: 'https://git-dev-explorer-mu.vercel.app/',
		desc: 'Search GitHub users, view profile and repos.'
	}
];

function el(tag, cls, txt) {
	const e = document.createElement(tag);
	if (cls) e.className = cls;
	if (txt) e.textContent = txt;
	return e;
}

function initials(name) {
	return name
		.split(' ')
		.map(n => n[0] || '')
		.slice(0, 2)
		.join('')
		.toUpperCase();
}

function renderTeam() {
	const grid = document.getElementById('teamGrid');
	team.forEach((m, index) => {
		const card = el('div', 'team-card');
		card.style.setProperty('--delay', `${index * 80}ms`);

		const av = el('div', 'avatar');
		const avatarImg = el('img');
		const fallback = el('span', '', initials(m.name));
		avatarImg.src = m.avatar;
		avatarImg.alt = `${m.name} avatar`;
		avatarImg.loading = 'lazy';
		avatarImg.referrerPolicy = 'no-referrer';
		avatarImg.addEventListener('error', () => {
			avatarImg.remove();
			av.classList.add('avatar-fallback');
		});
		av.appendChild(avatarImg);
		av.appendChild(fallback);

		const info = el('div', 'member-info');
		const name = el('div', 'member-name', m.name);
		const skills = el('div', 'skills');
		m.skills.forEach(skill => {
			const tag = el('span', '', skill);
			skills.appendChild(tag);
		});

		const link = el('a', '', 'GitHub');
		link.href = m.git;
		link.target = '_blank';
		link.rel = 'noreferrer';

		info.appendChild(name);
		info.appendChild(skills);
		info.appendChild(link);

		card.appendChild(av);
		card.appendChild(info);

		grid.appendChild(card);
	});
}

function renderProjects() {
	const grid = document.getElementById('projectsGrid');

	projects.forEach((p, index) => {
		const card = el('div', 'project-card');
		card.style.setProperty('--delay', `${(index + team.length) * 70}ms`);

		const h = el('h3', '', '');
		h.textContent = p.title;

		const d = el('p', '', '');
		d.textContent = p.desc;

		const links = el('div', 'project-links', '');

		const r = el('a', '', 'Repo');
		r.href = p.repo;
		r.target = '_blank';
		r.rel = 'noreferrer';

		const l = el('a', '', 'Live');
		l.href = p.live;
		l.target = '_blank';
		l.rel = 'noreferrer';

		links.appendChild(r);
		links.appendChild(l);

		card.appendChild(h);
		card.appendChild(d);
		card.appendChild(links);

		grid.appendChild(card);
	});
}

function initTheme() {
	const btn = document.getElementById('themeToggle');
	const icon = document.getElementById('themeIcon');
	const label = document.getElementById('themeLabel');
	const stored = localStorage.getItem('theme');
	if (stored === 'dark') document.body.classList.add('dark');

	function syncTheme() {
		const dark = document.body.classList.contains('dark');
		icon.textContent = dark ? '◑' : '◐';
		label.textContent = dark ? 'Dark' : 'Light';
		btn.setAttribute('aria-pressed', String(dark));
	}

	syncTheme();

	btn.addEventListener('click', () => {
		const dark = document.body.classList.toggle('dark');
		localStorage.setItem('theme', dark ? 'dark' : 'light');
		syncTheme();
	});
}

function validateEmail(e) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

function initForm() {
	const form = document.getElementById('contactForm');
	const msg = document.getElementById('formMsg');

	form.addEventListener('submit', e => {
		e.preventDefault();

		const name = form.name.value.trim();
		const email = form.email.value.trim();
		const message = form.message.value.trim();

		if (!name || !email || !message) {
			msg.textContent = 'Please fill all fields';
			return;
		}

		if (!validateEmail(email)) {
			msg.textContent = 'Invalid email';
			return;
		}

		msg.textContent = 'Message sent';
		form.reset();
		setTimeout(() => (msg.textContent = ''), 3000);
	});
}

document.addEventListener('DOMContentLoaded', () => {
	renderTeam();
	renderProjects();
	initTheme();
	initForm();
});
