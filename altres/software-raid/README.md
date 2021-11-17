Software Raid
=============

Install package mdadm

    # aptitude install mdadm

Create a new array

    # mdadm --create /dev/md0 --level=raid1 --raid-devices=2 /dev/sdb1 /dev/sdc1

Add the new RAID in the main configuration file for mdadm

    # mdadm --detail --scan >> /etc/mdadm/mdadm.conf

Now we go to check the status the new array

    # mdadm --detail /dev/md0

Next step we go to format new array:
    
    # mkfs.ext4 -v -L "NEWARRAYRAID1" /dev/md0

And we get the UUID with blkid command:
    
    # blkid | grep /dev/md0

We add the next line to file **/etc/fstab**. And we don't forget create the folder where you'll mount the array:

    UUID=feeaa6fb-9c7b-4213-8a83-2f9c1ed77a68 /media/RAID1 ext4 defaults 0 1

Finally generate an initramfs image:
    
    update-initramfs -u

Remove disk on RAID
-------------------

We can’t remove a disk directly from the array, unless it is failed, so we first have to fail it:

    # mdadm --fail /dev/md0 /dev/sdc1

And now we can remove it:
    
    # mdadm --remove /dev/md0 /dev/sdc1

Verifying the status of the RAID arrays:
    
    # cat /proc/mdstat
or
    # mdadm --detail /dev/md0

Add new disc to array:
    
    # mdadm --add /dev/md0 /dev/sdc1

Verifying the status of the RAID arrays:
    
    # cat /proc/mdstat
or

    # mdadm --detail /dev/md0