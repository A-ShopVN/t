/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 50,
            sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)


/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader(){
    const header = document.getElementById('header')
    // When the scroll is greater than 80 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 80) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

// =======================================tab==========================================

// script.js
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav__link');
    const sections = document.querySelectorAll('.section');

    // Hàm hiển thị tab dựa trên ID
    function showTab(tabId) {
        // Xóa class active từ tất cả các liên kết và phần tử
        navLinks.forEach(link => link.classList.remove('active-link'));
        sections.forEach(section => section.classList.remove('active'));

        // Thêm class active vào liên kết và phần tử tương ứng
        const targetLink = [...navLinks].find(link => link.getAttribute('data-target') === tabId);
        const targetSection = document.getElementById(tabId);

        if (targetLink) {
            targetLink.classList.add('active-link');
        }
        if (targetSection) {
            targetSection.classList.add('active');
        }
    }

    // Thêm sự kiện click cho tất cả các liên kết tab
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');

            // Hiển thị tab được chọn và lưu trạng thái vào localStorage
            showTab(targetId);
            localStorage.setItem('activeTab', targetId);
        });
    });

    // Khôi phục trạng thái tab từ localStorage khi trang được tải lại
    const savedTabId = localStorage.getItem('activeTab');
    if (savedTabId) {
        showTab(savedTabId);
    } else {
        // Tùy chọn: Hiển thị tab đầu tiên nếu không có trạng thái lưu
        showTab(navLinks[0].getAttribute('data-target'));
    }
});





// =============daily=====================
const postButton = document.getElementById('post-button');
    const postContent = document.getElementById('post-content');
    const postsContainer = document.getElementById('posts-container');
    const languageSelect = document.getElementById('language-select');

    postContent.addEventListener('input', () => {
        postButton.disabled = !postContent.value.trim();
    });

    window.onload = function() {
        displaySavedPosts();
    }

    function createPost() {
        const content = postContent.value.trim();
        const currentDate = new Date().toLocaleString();
        const author = "Dang Canh"; // Tên tác giả cố định cho ví dụ

        savePost(content, currentDate, author);
        displayPost(content, currentDate, author);

        postContent.value = '';
        postButton.disabled = true;
    }

    function displayPost(content, date, author, index = null) {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        
        const headerElement = `
            <div class="post-header">
                <div class="profile-pic"><img src="avt.jpg" alt="" class="profile-pic"></div>
                <div>
                    <strong class="strong">Đặng Cảnh</strong>
                    <div class="post-date">${date}</div>
                </div>
            </div>
        `;
        
        const contentElement = `<p class="post-content">${content}</p>`;
        const authorNote = `<p class="author-note"> --${author}--</p>`;
        const speakButton = `<button class="speak-button" onclick="speak('${content}')">🔊</button>`;
        
        // Tạo nút xóa
        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-button';
        deleteButton.textContent = 'x';
        deleteButton.onclick = function() {
            deletePost(index);
        };
    
        postElement.innerHTML = headerElement + contentElement + authorNote + `<div class="post-footer">${speakButton}</div>`;
        postElement.appendChild(deleteButton); // Thêm nút xóa vào bài đăng
    
        postsContainer.insertBefore(postElement, postsContainer.firstChild);
    }
    

    function savePost(content, date, author) {
        const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
        savedPosts.push({ content, date, author });
        localStorage.setItem('posts', JSON.stringify(savedPosts));
    }

    function displaySavedPosts() {
        const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
        savedPosts.forEach((post, index) => {
            displayPost(post.content, post.date, post.author, index);
        });
    }

    function deletePost(index) {
        let savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
        savedPosts.splice(index, 1); // Xóa bài đăng tại vị trí index
        localStorage.setItem('posts', JSON.stringify(savedPosts));
        refreshPosts();
    }

    function refreshPosts() {
        postsContainer.innerHTML = ''; // Xóa hết nội dung hiện tại
        displaySavedPosts(); // Hiển thị lại các bài đã lưu
    }

    function speak(content) {
        const selectedLanguage = languageSelect.value;
        const utterance = new SpeechSynthesisUtterance(content);
        utterance.lang = selectedLanguage;
        window.speechSynthesis.speak(utterance);
    }
// dashboard
