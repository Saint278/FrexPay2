/**
 * FrexPay - Cards Page JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // Kart Detayları Görüntüleme
    const cardDetailsButtons = document.querySelectorAll('.btn-sm');
    cardDetailsButtons.forEach(button => {
        if (button.querySelector('i.fa-eye')) {
            button.addEventListener('click', function() {
                // Gerçek uygulamada burada kart detayları modalı açılacak
                console.log('Kart detayları görüntüleniyor...');
            });
        }
    });

    // Kart Kilitleme/Kilit Açma İşlemleri
    const lockButtons = document.querySelectorAll('.btn-sm');
    lockButtons.forEach(button => {
        if (button.querySelector('i.fa-lock') || button.querySelector('i.fa-unlock')) {
            button.addEventListener('click', function() {
                const cardItem = this.closest('.card-grid-item');
                const statusElement = cardItem.querySelector('.info-item .value');
                
                if (this.querySelector('i.fa-lock')) {
                    // Kartı kilitle
                    this.querySelector('i').classList.remove('fa-lock');
                    this.querySelector('i').classList.add('fa-unlock');
                    this.querySelector('span').textContent = 'Kilidi Aç';
                    
                    if (statusElement) {
                        statusElement.textContent = 'Kilitli';
                        statusElement.classList.remove('active');
                        statusElement.classList.add('locked');
                    }
                    
                    console.log('Kart kilitlendi');
                } else {
                    // Kartın kilidini aç
                    this.querySelector('i').classList.remove('fa-unlock');
                    this.querySelector('i').classList.add('fa-lock');
                    this.querySelector('span').textContent = 'Kilitle';
                    
                    if (statusElement) {
                        statusElement.textContent = 'Aktif';
                        statusElement.classList.remove('locked');
                        statusElement.classList.add('active');
                    }
                    
                    console.log('Kart kilidi açıldı');
                }
            });
        }
    });

    // Sanal Kart Silme İşlemi
    const deleteButtons = document.querySelectorAll('.btn-sm');
    deleteButtons.forEach(button => {
        if (button.querySelector('i.fa-trash')) {
            button.addEventListener('click', function() {
                const cardItem = this.closest('.card-grid-item');
                
                // Onay modalı göster
                if (confirm('Bu sanal kartı silmek istediğinizden emin misiniz?')) {
                    // Animasyonlu silme işlemi
                    cardItem.style.opacity = '0';
                    cardItem.style.transform = 'scale(0.9)';
                    
                    setTimeout(() => {
                        cardItem.style.display = 'none';
                        // Gerçek uygulamada burada API çağrısı yapılacak
                        console.log('Kart silindi');
                    }, 300);
                }
            });
        }
    });

    // Yeni Kart Ekleme Butonu
    const addCardButtons = document.querySelectorAll('.add-card-content button');
    addCardButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Gerçek uygulamada burada yeni kart ekleme modalı açılacak
            console.log('Yeni kart ekleme işlemi başlatılıyor...');
        });
    });

    // Tab Değiştirme İşlemi
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Tüm tabları ve içerikleri pasif yap
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Seçilen tabı ve içeriğini aktif yap
            this.classList.add('active');
            document.getElementById(tabId + '-cards').classList.add('active');
        });
    });

    // Tablo Sıralama İşlemi
    const tableHeaders = document.querySelectorAll('.th-content');
    tableHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const sortIcon = this.querySelector('i');
            
            // Tüm sıralama ikonlarını sıfırla
            document.querySelectorAll('.th-content i').forEach(icon => {
                icon.className = 'fas fa-sort';
            });
            
            // Sıralama yönünü belirle ve ikonu güncelle
            if (sortIcon.classList.contains('fa-sort')) {
                sortIcon.className = 'fas fa-sort-up';
            } else if (sortIcon.classList.contains('fa-sort-up')) {
                sortIcon.className = 'fas fa-sort-down';
            } else {
                sortIcon.className = 'fas fa-sort-up';
            }
            
            // Gerçek uygulamada burada tablo sıralama işlemi yapılacak
            console.log('Tablo sıralama işlemi: ' + this.querySelector('span').textContent);
        });
    });
});