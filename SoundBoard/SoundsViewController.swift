//
//  ViewController.swift
//  SoundBoard
//
//  Created by Dylan on 4/6/17.
//  Copyright © 2017 Dylan. All rights reserved.
//

import UIKit
import AVFoundation

class ViewController: UIViewController {

    @IBOutlet var gorillaz: UIButton!
    @IBOutlet var allday: UIButton!
    
    var audioPlayer = AVAudioPlayer()
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        gorillaz.transform = CGAffineTransform(rotationAngle: CGFloat.pi / 10)
        allday.transform = CGAffineTransform(rotationAngle: -CGFloat.pi / 10)

        // Do any additional setup after loading the view, typically from a nib.
        
        let s_airhorn = Bundle.main.path(forResource: "Air-Horn", ofType: "mp3")
        let s_jibberish = Bundle.main.path(forResource: "Jibberish", ofType: "mp3")
        let s_stoptalkin = Bundle.main.path(forResource: "Stop-talkin-to-me", ofType: "mp3")
        let s_thathumble = Bundle.main.path(forResource: "Thats-humble", ofType: "mp3")
        let s_thatwasgood = Bundle.main.path(forResource: "That-was-good", ofType: "mp3")
        let s_yo = Bundle.main.path(forResource: "Yo", ofType: "mp3")
        let s_doinggood = Bundle.main.path(forResource: "Doing-good", ofType: "mp3")
        let s_interrupts = Bundle.main.path(forResource: "interrupts", ofType: "mp3")
//

    }
    
    @IBAction func playAllDay(_ sender: UIButton){
    let s_allday = Bundle.main.path(forResource: "Alldayn***a", ofType: "mp3")
    
        playClip(clip: s_allday!)
    
    }
    
    
    
    func playClip(clip: String){
        
        do {
            audioPlayer = try AVAudioPlayer(contentsOf: URL(fileURLWithPath: clip))
            try AVAudioSession.sharedInstance().setCategory(AVAudioSessionCategoryAmbient)
            try AVAudioSession.sharedInstance().setActive(true)
        }
        catch{
            print(error)
        }
        
        audioPlayer.currentTime = 0
        audioPlayer.play()
    }
    


}

