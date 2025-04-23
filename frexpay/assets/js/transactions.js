/**
 * FrexPay - Transactions Page JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // Filtre Temizleme
    const clearFilterButton = document.querySelector('.filter-actions .btn-light');
    if (clearFilterButton) {
        clearFilterButton.addEventListener('click', function() {
            // Tarih aralığı filtresini sıfırla
            const dateInputs = document.querySelectorAll('.date-range-picker input');
            const today = new Date();
            const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
            const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
            
            dateInputs[0].value = formatDate(firstDay);
            dateInputs[1].value = formatDate(lastDay);
            
            // Select filtreleri sıfırla
            document.querySelectorAll('.transactions-filters select').forEach(select => {
                select.selectedIndex = 0;
            });
            
            console.log('Filtreler temizlendi');
        });
    }
    
    // Filtre Uygulama
    const applyFilterButton = document.querySelector('.filter-actions .btn-primary');
    if (applyFilterButton) {
        applyFilterButton.addEventListener('click', function() {
            // Filtre değerlerini al
            const startDate = document.querySelector('.date-range-picker input:first-child').value;
            const endDate = document.querySelector('.date-range-picker input:last-child').value;
            const transactionType = document.querySelector('.filter-group:nth-child(2) select').value;
            const category = document.querySelector('.filter-group:nth-child(3) select').value;
            const status = document.querySelector('.filter-group:nth-child(4) select').value;
            
            // Gerçek uygulamada burada API çağrısı yapılacak
            console.log('Filtreler uygulandı:', {
                startDate,
                endDate,
                transactionType,
                category,
                status
            });
            
            // Örnek olarak tablo yükleniyor efekti
            const tableContainer = document.querySelector('.transactions-table-container');
            tableContainer.style.opacity = '0.5';
            
            setTimeout(() => {
                tableContainer.style.opacity = '1';
            }, 800);
        });
    }
    
    // İşlem Detayı Görüntüleme
    const viewButtons = document.querySelectorAll('.action-btn');
    const modal = document.getElementById('transactionDetailModal');
    
    if (modal) {
        viewButtons.forEach(button => {
            if (button.querySelector('i.fa-eye')) {
                button.addEventListener('click', function() {
                    const row = this.closest('tr');
                    const time = row.querySelector('.transaction-date .time').textContent;
                    const id = row.querySelector('.transaction-id span').textContent;
                    const description = row.querySelector('.transaction-description span').textContent;
                    const category = row.querySelector('.transaction-category span').textContent;
                    const method = row.querySelector('.transaction-method span').textContent;
                    const amount = row.querySelector('.transaction-amount').textContent;
                    const status = row.querySelector('.transaction-status span').textContent;
                    
                    // Modal içeriğini güncelle
                    modal.querySelector('.transaction-detail-info h4').textContent = description;
                    modal.querySelector('.transaction-detail-date').textContent = `${date}, ${time}`;
                    modal.querySelector('.transaction-detail-amount').textContent = amount;
                    modal.querySelector('.transaction-detail-amount').className = 
                        amount.includes('+') ? 'transaction-detail-amount incoming' : 'transaction-detail-amount outgoing';
                    
                    // Detay alanlarını güncelle
                    const detailGroups = modal.querySelectorAll('.detail-group');
                    detailGroups[0].querySelector('.detail-value').textContent = id;
                    
                    // İkon güncelleme
                    let iconClass = 'fa-shopping-bag';
                    if (category.includes('Elektronik')) {
                        iconClass = 'fa-laptop';
                    } else if (category.includes('Faturalar')) {
                        iconClass = 'fa-file-invoice';
                    } else if (category.includes('Eğlence')) {
                        iconClass = 'fa-film';
                    } else if (category.includes('Yiyecek')) {
                        iconClass = 'fa-utensils';
                    } else if (category.includes('Gelir')) {
                        iconClass = 'fa-money-bill-wave';
                    }
                    
                    modal.querySelector('.transaction-detail-icon i').className = `fas ${iconClass}`;
                    
                    // Modalı göster
                    modal.style.display = 'flex';
                    setTimeout(() => {
                        modal.classList.add('show');
                    }, 10);
                });
            }
        });
        
        // Modal kapatma
        const closeButton = modal.querySelector('.modal-close');
        closeButton.addEventListener('click', function() {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        });
        
        // Modal dışına tıklama ile kapatma
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.classList.remove('show');
                setTimeout(() => {
                    modal.style.display = 'none';
                }, 300);
            }
        });
    }
    
    // Tablo Sıralama
    const tableHeaders = document.querySelectorAll('.th-content');
    tableHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const column = this.querySelector('span').textContent;
            const icon = this.querySelector('i');
            let direction = 'asc';
            
            // Tüm sıralama ikonlarını sıfırla
            document.querySelectorAll('.th-content i').forEach(i => {
                i.className = 'fas fa-sort';
            });
            
            // Tıklanan başlığın sıralama ikonunu güncelle
            if (icon.classList.contains('fa-sort') || icon.classList.contains('fa-sort-down')) {
                icon.className = 'fas fa-sort-up';
                direction = 'asc';
            } else {
                icon.className = 'fas fa-sort-down';
                direction = 'desc';
            }
            
            // Gerçek uygulamada burada tablo sıralama işlemi yapılacak
            console.log(`Tablo "${column}" sütununa göre "${direction}" yönünde sıralanıyor`);
            
            // Örnek olarak tablo yükleniyor efekti
            const tableContainer = document.querySelector('.transactions-table-container');
            tableContainer.style.opacity = '0.5';
            
            setTimeout(() => {
                tableContainer.style.opacity = '1';
            }, 500);
        });
    });
    
    // Sayfalama
    const paginationButtons = document.querySelectorAll('.pagination-btn');
    paginationButtons.forEach(button => {
        if (!button.disabled && !button.classList.contains('active')) {
            button.addEventListener('click', function() {
                const page = this.textContent;
                
                // Aktif sayfa butonunu güncelle
                document.querySelectorAll('.pagination-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                this.classList.add('active');
                
                // Gerçek uygulamada burada sayfalama işlemi yapılacak
                console.log(`Sayfa ${page} gösteriliyor`);
                
                // Örnek olarak tablo yükleniyor efekti
                const tableContainer = document.querySelector('.transactions-table-container');
                tableContainer.style.opacity = '0.5';
                
                setTimeout(() => {
                    tableContainer.style.opacity = '1';
                }, 500);
            });
        }
    });
    
    // Tablo Arama
    const searchInput = document.querySelector('.search-mini input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            // Gerçek uygulamada burada arama işlemi yapılacak
            console.log(`"${searchTerm}" için arama yapılıyor`);
            
            // Basit bir örnek: Tablodaki açıklamalarda arama
            const rows = document.querySelectorAll('.transactions-table tbody tr');
            rows.forEach(row => {
                const description = row.querySelector('.transaction-description span').textContent.toLowerCase();
                if (description.includes(searchTerm) || searchTerm === '') {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
    
    // Grafik Tipi Değiştirme
    const chartToggleButtons = document.querySelectorAll('.chart-toggle-btn');
    chartToggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const chartType = this.getAttribute('data-chart');
            
            // Aktif buton sınıfını değiştir
            chartToggleButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
            
            // Gerçek uygulamada burada grafik tipi değiştirilecek
            console.log(`Grafik tipi "${chartType}" olarak değiştirildi`);
        });
    });
    
    // Tarih Formatı Yardımcı Fonksiyonu
    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    
    // Makbuz İndirme
    const downloadButtons = document.querySelectorAll('.action-btn');
    downloadButtons.forEach(button => {
        if (button.querySelector('i.fa-download')) {
            button.addEventListener('click', function() {
                const row = this.closest('tr');
                const id = row.querySelector('.transaction-id span').textContent;
                const description = row.querySelector('.transaction-description span').textContent;
                
                // Gerçek uygulamada burada makbuz indirme işlemi yapılacak
                console.log(`${id} numaralı "${description}" işleminin makbuzu indiriliyor`);
                
                // İndirme simülasyonu
                button.disabled = true;
                button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                
                setTimeout(() => {
                    button.disabled = false;
                    button.innerHTML = '<i class="fas fa-download"></i>';
                    alert(`${id} numaralı işlem makbuzu indirildi.`);
                }, 1500);
            });
        }
    });
    
    // Modal içindeki makbuz indirme butonu
    const modalDownloadButton = document.querySelector('.transaction-detail-actions .btn:first-child');
    if (modalDownloadButton) {
        modalDownloadButton.addEventListener('click', function() {
            const id = document.querySelector('.detail-group:first-child .detail-value').textContent;
            
            // Gerçek uygulamada burada makbuz indirme işlemi yapılacak
            console.log(`${id} numaralı işlemin makbuzu indiriliyor`);
            
            // İndirme simülasyonu
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>İndiriliyor...</span>';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
                alert(`${id} numaralı işlem makbuzu indirildi.`);
            }, 1500);
        });
    }
    
    // Modal içindeki paylaş butonu
    const shareButton = document.querySelector('.transaction-detail-actions .btn:nth-child(2)');
    if (shareButton) {
        shareButton.addEventListener('click', function() {
            const id = document.querySelector('.detail-group:first-child .detail-value').textContent;
            
            // Gerçek uygulamada burada paylaşım işlemi yapılacak
            console.log(`${id} numaralı işlem paylaşılıyor`);
            
            // Paylaşım simülasyonu
            alert(`Paylaşım bağlantısı kopyalandı.`);
        });
    }
    
    // Modal içindeki sorun bildir butonu
    const reportButton = document.querySelector('.transaction-detail-actions .btn:last-child');
    if (reportButton) {
        reportButton.addEventListener('click', function() {
            const id = document.querySelector('.detail-group:first-child .detail-value').textContent;
            
            // Gerçek uygulamada burada sorun bildirme işlemi yapılacak
            console.log(`${id} numaralı işlem için sorun bildiriliyor`);
            
            // Sorun bildirme simülasyonu
            const reason = prompt('Lütfen sorunu kısaca açıklayın:');
            if (reason) {
                alert(`Sorun bildiriminiz alındı. En kısa sürede incelenecektir.`);
            }
        });
    }
});